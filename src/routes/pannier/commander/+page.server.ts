import type { Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import CommandeModel from '$lib/models/Commande';


export const actions: Actions = {
  default: async ({request , locals }) => {

    let data = await request.formData();

    let formReponse : any  = {
        nom : data.get('nom')?.toString(),
        prenom : data.get('prenom')?.toString(),
        rue : data.get('rue')?.toString(),
        complement : data.get('complement')?.toString(),
        cp : data.get('cp')?.toString(),
        ville : data.get('ville')?.toString(),
        pays : data.get('pays')?.toString(),
        telephone : data.get('telephone')?.toString(),
        email : data.get('email')?.toString(),
        error : {}
    }

    //-----------Validation---------------
    if( !formReponse.nom.match(/^[A-ZÀ-ÿa-z. '-,]+$/) ) 
        formReponse.error['nom'] = true
    
    if( !formReponse.prenom.match(/^[A-ZÀ-ÿa-z. '-,]+$/) )
        formReponse.error['prenom'] = true

    if( !formReponse.email.match(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/) ) 
        formReponse.error['email'] = true

    if( !formReponse.telephone.match(/^(0|\\+33|0033)[1-9][0-9]{8}$/) ) 
        formReponse.error['telephone'] = true

    if( !formReponse.cp.match(/^(?:0[1-9]|[1-8]\d|9[0-8])\d{3}$/) ) 
        formReponse.error['cp'] = true

    if(!['france','belgique'].find((pays) => formReponse.pays.toLowerCase() === pays) )
        formReponse.error['pays'] = true
    
    if(Object.getOwnPropertyNames(formReponse.error).length > 0) 
        return fail(400, formReponse);

    //----Enregistrement des informations------
    else {  
        try {
            await CommandeModel.updateOne({utilisateur : locals.session.data.user.id, statut : 'en pannier'},{
                infoLivraison : {
                    nom : formReponse.nom,
                    prenom : formReponse.prenom,
                    adresse : {
                        rue : formReponse.rue,
                        complement : formReponse.complement,
                        cp : formReponse.cp,
                        ville : formReponse.ville,
                        pays : formReponse.pays
                    },
                    telephone : formReponse.telephone,
                    email : formReponse.email
                },
                dernierModif : Date.now()
            })
    
        } catch(error) {
            console.log(error)
            await locals.session.update(({}) => ({ flash: { type:'error', message:"Erreur lors de l'enregistrement des information de livraison", vue:false} }));
            return fail(400, {});
        } 

        throw redirect(303, "/pannier/paiement");
    }
  }
};