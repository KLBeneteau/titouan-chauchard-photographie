import type { Actions, PageServerLoad } from './$types';
import { fail, redirect } from '@sveltejs/kit';
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

        let formReponse : any  = {
            email : data.get('email'),
            error : {}
        }

        //vérifie si l'utilisateur hésiste déja 
        const user = await UserModel.findOne({email:data.get("email")})

        if(!user)
            formReponse.error['email'] = true

        if(user && !bcrypt.compareSync(data.get('password')?.toString()||'', user.password))
            formReponse.error['password'] = true

        if(Object.getOwnPropertyNames(formReponse.error).length > 0) 
            return fail(400, formReponse);

        else {  

            let localsUser = {
                nom : user?.nom,
                prenom : user?.prenom,
                telephone : user?.telephone,
                email : user?.email,
                role : user?.role,
                id : user?._id
            }

            await event.locals.session.set({ user: localsUser, flash: null });

            throw redirect(303, "/");
        }
            
  }
};