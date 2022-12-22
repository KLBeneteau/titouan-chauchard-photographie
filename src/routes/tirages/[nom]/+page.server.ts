import type { PageServerLoad } from './$types';
import { redirect,fail  } from '@sveltejs/kit';
import type { Actions } from './$types';

import UserModel from '$lib/models/User';
import ProduitModel from '$lib/models/Produit';
import CommandeModel from '$lib/models/Commande';

export const load: PageServerLoad = async ({ locals, params }) => {

   const tirage = await ProduitModel.findOne({nom: params.nom})

   if(!ProduitModel){
      await locals.session.update(({}) => ({ flash: { type:'error', message:'Tirage introuvable', vue:false} }));
      throw redirect(303, "/tirages");
   }
   else 
      return { tirage : JSON.parse(JSON.stringify(tirage)) } 
}

export const actions: Actions = {

   update: async (event) => {
 
      if(event.locals.session.data.user?.role !== "admin")
         throw redirect(303, "/tirages");
 
      let data = await event.request.formData();

      const tirage = await ProduitModel.findOne({nom: data.get('nom')?.toString().trim().replace(/ /,"_")})

      if(tirage && event.params.nom!==tirage.nom ){
         await event.locals.session.update(({}) => ({ flash: { type:'error', message:'Nom déja utilisé', vue:false} }));
         return fail(400, {});
      }

      try {    
         await ProduitModel.updateOne(
            {nom: event.params.nom},
            {  $set : {
                  nom : data.get('nom')?.toString().trim().replace(/ /,"_"),
                  description : data.get('description')?.toString(),
                  image : data.get('image')!=="undefined" ? data.get('image') : tirage?.image,
                  tarif : JSON.parse(data.get("tarifs")?.toString() ?? "[]")
               }
            })
         await event.locals.session.update(({}) => ({ flash: { type:'success', message:'Tirage modifier avec succès', vue:false} }));
      } 
      catch (error) {
         console.log(error)
         await event.locals.session.update(({}) => ({ flash: { type:'error', message:'erreur lors de la modification', vue:false} }));
         return fail(400, {});
      }

      throw redirect(303, "/tirages/"+data.get('nom')?.toString().trim().replace(/ /,"_"));
   },

   ajouterPannier: async (event) => { 

      if(event.locals.session.data.user)
         throw redirect(303, "/connexion");

      let data = await event.request.formData();
     
      try {

         //Si le pannier existe on ajoute le produit
         const user = UserModel.findOne({email : event.locals.session.data.user.email})
         if(user?.pannier){
            await CommandeModel.updateOne(
               { _id : user?.pannier},
               {
                  $set : { dernierModif : Date.now() },
                  $push: {
                     contenu : {
                        produit : data.get("id")?.toString(),
                        quantite : 1,
                        dimension : data.get("dimension")?.toString()
                     }
                  }
               }
            )
            await event.locals.session.update(({}) => ({ flash: { type:'success', message:'Le tirage à bien été ajouté au pannier', vue:false} }));
         }
         //Sinon on créer le pannier avec le produit
         else {

            const produit = await ProduitModel.findById(data.get("id")?.toString())
            let dimension = data.get("dimension")?.toString()

            //Vérifier que la dimension envoyer existe bien chez le produit
            if(!dimension || !produit?.tarif.map(t => t.dimension).find(d => d===dimension)){
               await event.locals.session.update(({}) => ({ flash: { type:'error', message:'Dimension non valide', vue:false} }));
               return fail(400, {});
            }  

            await CommandeModel.create({
               utilisateur : user._id,
               contenu : [{
                  produit : produit?._id,
                  quantite : 1,
                  dimension : dimension
               }],
            })
            await event.locals.session.update(({}) => ({ flash: { type:'success', message:'Le tirage à bien été ajouté au pannier', vue:false} }));
         }
         
         throw redirect(303, "/tirages");
      } catch (error) {
         await event.locals.session.update(({}) => ({ flash: { type:'error', message:"Erreur lors de l'ajout au pannier", vue:false} }));
         return fail(400, {});
      }
   }
};