import type { Actions, PageServerLoad } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import UserModel from '$lib/models/User';
import { sendMail } from '$lib/utils/mailer';
import * as bcrypt from 'bcrypt';

export const load: PageServerLoad = async ({ locals, url }) => {
    
    //On ne veux pas de token a null => car les user qui n'ont pas fait de demande on un token null en bdd 
    if(locals.session.data.user || url.searchParams.get('token')==null)
        throw redirect(303, "/");

    const user = await UserModel.findOne({
        email : url.searchParams.get('email'),
        token : url.searchParams.get('token')
    })

    if(!user)
        throw redirect(303, "/");
    else 
        return {}
    
}


export const actions: Actions = {
	default: async (event) => {

        let data = await event.request.formData();

        let formReponse : any  = {
            error : {}
        }

        //-----------Validation---------------
        if(data.get('password') !== data.get('confirm-password')) 
            formReponse.error['confirm-password'] = true

        if(!String(data.get('password'))?.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)) 
            formReponse.error['password'] = true

        if(Object.getOwnPropertyNames(formReponse.error).length > 0 || event.url.searchParams.get('token')==null) 
            return fail(400, formReponse);


        else { 
            
            try {
                const user = await UserModel.findOneAndUpdate({email : event.url.searchParams.get('email'), token : event.url.searchParams.get('token')},{
                    token : null,
                    password : bcrypt.hashSync(data.get('password')?.toString()||'', bcrypt.genSaltSync(13))
                })
                const mail = await sendMail(
                    user?.email ?? '',
                    'Votre mot de passe a été modifié !',
                    `<h1>${user?.prenom}, votre mot de passe a été modifié !</h1>
                    <p>Si vous n'êtes pas à l'origine de cette demande, contactez-moi par mail ! </p> 
                    <br/><p>Titouan Chauchard</p>
                    <p>titouan.chauchard.photographie@gmail.com</p>`
                );
                if(!mail)
                    await event.locals.session.update(() => ({ flash: { type:'error', message:"Echec lors de l'envoi du mail...", vue:false} }));
                else 
                    await event.locals.session.update(() => ({ flash: { type:'success', message:'Votre mot de passe a correctement été modifié', vue:false} }));

            } catch {
                await event.locals.session.update(() => ({ flash: { type:'error', message:"Echec lors de l'enregistrement du mot de passe", vue:false} }));
                return fail(400, formReponse);
            }
            throw redirect(303, "/");
        }   
    }
};