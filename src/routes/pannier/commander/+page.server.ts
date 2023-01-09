import type { Actions } from './$types';
import { fail } from '@sveltejs/kit';


export const actions: Actions = {
  default: async (event) => {

    let data = await event.request.formData();
    // console.log(event) -> plein d'info la dedans 
    //console.log(data)

    let formReponse : any  = {
        nom : data.get('nom'),
        prenom : data.get('prenom'),
        rue : data.get('rue'),
        complement : data.get('complement'),
        cp : data.get('cp'),
        ville : data.get('ville'),
        pays : data.get('pays'),
        telephone : data.get('telephone'),
        email : data.get('email'),
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

    if(!['france','belgique'].find(formReponse.pays.toLowerCase()))
        formReponse.error['pays'] = true
    
    if(Object.getOwnPropertyNames(formReponse.error).length > 0) 
        return fail(400, formReponse);

    //----Enregistrement des informations------
    else {
        
    }
  }
};