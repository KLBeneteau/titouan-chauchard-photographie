import type { PageServerLoad } from './$types';
import type { Actions } from './$types';
import { redirect,fail  } from '@sveltejs/kit';
import AlbumModel from '$lib/models/Album';

export const load: PageServerLoad = async ({ locals, params }) => {
   const album = await AlbumModel.findOne({nom: params.nom})
   if(!album){
      await locals.session.update(() => ({ flash: { type:'error', message:'Album introuvable', vue:false} }));
      throw redirect(303, "/portfolio");
   }
   else 
      return { album : JSON.parse(JSON.stringify(album)) } 
}


export const actions: Actions = {

  update: async (event) => {

      if(event.locals.session.data.user?.role !== "admin")
         throw redirect(303, "/portfolio");

      let data = await event.request.formData();
      const album = await AlbumModel.findOne({nom: data.get('nom')})

      if(album && event.params.nom!==album.nom ){
         await event.locals.session.update(() => ({ flash: { type:'error', message:'Nom déja utilisé', vue:false} }));
         return fail(400, {});
      }

      try {
         let Newimages = JSON.parse(data.get('photographiesFiles')?.toString()?? "[]").map((str:string) => new Object(str))
         
         await AlbumModel.updateOne(
            {nom: event.params.nom},
            {  $set : {
                  nom : data.get('nom')?.toString().trim().replace(/ /,"_"),
                  description : data.get('description')?.toString(),
                  banderole : data.get('banderoleFile')!=="undefined" ? data.get('banderoleFile') : album?.banderole,
                  vignette : data.get('vignetteFile')!=="undefined" ? data.get('vignetteFile') : album?.vignette,
                  formatVignette : !!data.get('formatVignette')
               },
               $push: { images: { $each: Newimages } }
            })
         await event.locals.session.update(() => ({ flash: { type:'success', message:'Album modifier avec succès', vue:false} }));
      } 
      catch (error) {
         console.log(error)
         await event.locals.session.update(() => ({ flash: { type:'error', message:'erreur lors de la modification', vue:false} }));
         return fail(400, {});
      }

      throw redirect(303, "/portfolio/"+data.get('nom')?.toString().trim().replace(/ /,"_"));
  },

  delete: async (event) => { 

      if(event.locals.session.data.user?.role !== "admin")
         throw redirect(303, "/portfolio");

      let data = await event.request.formData();

      let index = Number(data.get('index'))
      let query :any = {} ;
      query["images."+index] = 1
      
      await AlbumModel.updateOne(
         {nom : event.params.nom},
         {  $unset : query }
      )
      await AlbumModel.updateOne(
         {nom : event.params.nom},
         {$pull : {images : null}}
      )
   }  

};