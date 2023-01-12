import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import CommandeModel from '$lib/models/Commande';

export const actions: Actions = {

  save: async ({locals, request}) => {

    if(!locals.session.data.user)
        throw redirect(303, "/");

    let data = await request.formData();

    await savePannier(locals.session.data.user.id,JSON.parse('['+data.get('quantite')+']'))

    await locals.session.update(({}) => ({ flash: { type:'success', message:'Votre pannier à bien été sauvegardé', vue:false} }));

    throw redirect(303, "/pannier");
   
  },

  commander: async ({locals, request}) => {

    if(!locals.session.data.user)
        throw redirect(303, "/");

    let data = await request.formData();
    await savePannier(locals.session.data.user.id,JSON.parse('['+data.get('quantite')+']'))

    throw redirect(303, "/pannier/commander");
    
  }

}

async function savePannier(userId:any,quantites:Number[]){

    //si quantité = 0 => remove 
    //si quantité >= 1 => update
    let query : any = {
        $set : {
            dernierModif : Date.now()
        },
        $unset : {}
    }
    
    for(let i = 0; i < quantites.length; i++)
        if(quantites[i] > 0) 
            query.$set["contenu."+i+".quantite"] = quantites[i]
        else 
            query.$unset["contenu."+i] = 1
    
    await CommandeModel.updateOne(
        {utilisateur : userId, statut : 'en pannier'},
        query
    )

    await CommandeModel.updateOne(
        {utilisateur : userId, statut : 'en pannier'},
        {$pull : {contenu : null}}
    )
    
}
