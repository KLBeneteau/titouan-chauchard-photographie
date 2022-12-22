import type { Actions } from './$types';
import { redirect,fail  } from '@sveltejs/kit';
import ProduitModel from '$lib/models/Produit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({}) => {

    const produits = JSON.parse(JSON.stringify(await ProduitModel.find()))
                            .map((p:any) =>  { return {nom : p.nom, image : p.image }})

   return { 
        produits : produits 
   }
}

export const actions: Actions = {

    create: async (event:any) => {

        if(event.locals.session.data.user?.role !== "admin")
           return fail(401, {});

        const newAlbum = await ProduitModel.create({ nom:"nouveau_tirage"})
        throw redirect(303, "/tirages/"+newAlbum.nom);
    },
  
    delete: async (event:any) => { 

        if(event.locals.session.data.user?.role !== "admin")
            return fail(401, {});

        let data = await event.request.formData();

        await ProduitModel.deleteOne({nom : data.get('nom')})

        await event.locals.session.update(({}) => ({ flash: { type:'success', message:'Tirage supprimer avec succès', vue:false} }));
        throw redirect(303, "/tirages");
    }
  
};