import type { Actions, PageServerLoad } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import UserModel from '$lib/models/User';
import md5 from "md5"
import { sendMail } from '$lib/utils/mailer';
import dotenv from "dotenv";

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
            email : data.get('email')?.toString(),
            error : {}
        }

        //vérifie si l'utilisateur hésiste déja 
        const user = await UserModel.findOne({email:data.get("email")?.toString()})

        if(!user){
            formReponse.error['email'] = true
            return fail(400, formReponse);
        }
        else try { 

            dotenv.config();
            const {BASE_HREF} = process.env;

            let token = md5('TC-Ph0t0'+Date.now()+Math.floor(Math.random() * 10000)).toString();
            await UserModel.updateOne(
                {_id : user._id},
                {token : token}
            )
            await sendMail(
                user.email,
                'Réinistialisation de votre mot de passe',
                `<h1>${user.prenom}, vous avez oublié votre mot de passe ?</h1>
                <p>Cliquez sur ce lien pour entrer votre nouveau mot de passe : ${BASE_HREF}/connexion/reinitialisation?email=${user.email}&token=${token}</p>
                <p><b>Ne partagez jamais ce lien !</b><p>
                <br/><p>Si vous n'êtes pas à l'origine de cette demande, contactez-moi par mail ! </p> 
                <br/><p>Titouan Chauchard</p>
                <p>titouan.chauchard.photographie@gmail.com</p>`
            );

            await event.locals.session.update(() => ({ flash: { type:'success', message:'Un email de réinitialisation vous a été envoyé !', vue:false} }));

        } catch {
            await event.locals.session.update(() => ({ flash: { type:'error', message:"Echec lors de l'envoi de mail...", vue:false} }));
            return fail(400, formReponse);
        }
        throw redirect(303, "/");     
  }
};