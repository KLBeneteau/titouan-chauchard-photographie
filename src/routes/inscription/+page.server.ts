import type { Actions,PageServerLoad } from './$types';
import { fail, redirect  } from '@sveltejs/kit';
import UserModel from '$lib/models/User';
import * as bcrypt from 'bcrypt';

export const load: PageServerLoad = ({ locals }) => {

    if(locals.session.data.user)
        throw redirect(303, "/");
    else 
        return {};
}
 
export const actions: Actions = {
  default: async (event) => {

    let data = await event.request.formData();
    // console.log(event) -> plein d'info la dedans 
    //console.log(data)

    let formReponse : any  = {
        nom : data.get('nom'),
        prenom : data.get('prenom'),
        telephone : data.get('telephone'),
        email : data.get('email'),
        error : {}
    }

    //-----------Validation---------------
    if ( data.get('password') !== data.get('confirm-password') ) 
        formReponse.error['confirm-password'] = true

    if( !String(data.get('password'))?.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/) ) 
        formReponse.error['password'] = true
    
    if( !formReponse.nom.match(/^[A-ZÀ-ÿa-z. '-,]+$/) ) 
        formReponse.error['nom'] = true
    
    if( !formReponse.prenom.match(/^[A-ZÀ-ÿa-z. '-,]+$/) )
        formReponse.error['prenom'] = true

    if( !formReponse.email.match(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/) ) 
        formReponse.error['email'] = true

    if( !formReponse.telephone.match(/^(0|\\+33|0033)[1-9][0-9]{8}$/) ) 
        formReponse.error['telephone'] = true
    
    if(Object.getOwnPropertyNames(formReponse.error).length > 0) 
        return fail(400, formReponse);

    //----Enregistrement de l'utlisateur------
    else {
        
        //vérifie si l'utilisateur hésiste pas déja 
        const user = await UserModel.findOne({email:formReponse.email})

        if(user) { 
            formReponse.error['userExiste'] = true
            return fail(400, formReponse);
        }
        else {
            await UserModel.create({
                nom: formReponse.nom,
                prenom: formReponse.prenom,
                email: formReponse.email,
                telephone: formReponse.telephone,
                password: bcrypt.hashSync(data.get('password')?.toString()||'', bcrypt.genSaltSync(13))
            })

            await event.locals.session.update(({}) => ({ flash: { type:'success', message:'Compte créé avec succès', vue:false} }));

            throw redirect(303, "/");
        }
    }
  }
};