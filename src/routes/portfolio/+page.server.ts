import type { PageServerLoad } from './$types';
import type { Actions } from './$types';
import { redirect,fail  } from '@sveltejs/kit';
import AlbumModel from '$lib/models/Album';

export const load: PageServerLoad = async () => {

    const albums = JSON.parse(JSON.stringify(await AlbumModel.find())).map((a:any) =>  { return {vignette : a.vignette, format : a.formatVignette, nom : a.nom}})

    let albumsPetit = albums.filter((a:any) => !a.format)
    let albumsGrand = albums.filter((a:any) => a.format)
    
    let nbrLigne = albumsPetit.length/2 > albumsGrand.length ? albumsPetit.length/2 : albumsGrand.length
    let lignes = []

    for(let i=0; i < nbrLigne; i++){
        lignes.push({
            grand : albumsGrand.length-1 >= i ? albumsGrand[i] : null,
            petit1 : albumsPetit.length-1 >= i*2 ? albumsPetit[i*2] : null,
            petit2 : albumsPetit.length-1 >= (i*2)+1 ? albumsPetit[i*2+1] : null,
        })
    }

   return { 
        lignes : lignes 
   }
}

export const actions: Actions = {

    create: async (event:any) => {
  
        if(event.locals.session.data.user?.role !== "admin")
           return fail(401, {});

        const newAlbum = await AlbumModel.create({nom:"nouvel_Album"})
        throw redirect(303, "/portfolio/"+newAlbum.nom);
    },
  
    delete: async (event:any) => { 
  
        if(event.locals.session.data.user?.role !== "admin")
            return fail(401, {});

        let data = await event.request.formData();

        await AlbumModel.deleteOne({nom : data.get('nom')})

        await event.locals.session.update(() => ({ flash: { type:'success', message:'Album supprimer avec succès', vue:false} }));
        throw redirect(303, "/portfolio");
    }
  
};