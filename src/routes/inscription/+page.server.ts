import type { Actions,PageServerLoad } from './$types';
import { fail, redirect  } from '@sveltejs/kit';
import UserModel from '$lib/models/User';
import { sendMail } from '$lib/utils/mailer';
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
        nom : data.get('nom')?.toString(),
        prenom : data.get('prenom')?.toString(),
        telephone : data.get('telephone')?.toString(),
        email : data.get('email')?.toString(),
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

            const mail = await sendMail(
                formReponse.email,
                'Inscription à Titouan-Chauchard-Photographie',
                `<h1>Félicitation ${formReponse.nom} ${formReponse.prenom} !</h1>
                <p>Vous êtes désormais inscrit à mon site de photographie, j'espère que mes projets te plairont 😁</p>
                <br/><p>Titouan Chauchard</p>
                <p>titouan.chauchard.photographie@gmail.com</p>`
            );

            if(!mail)
                await event.locals.session.update(() => ({ flash: { type:'success', message:"Compte créé avec succès, mais notre mail de confirmation n'à pas pue vous parvenir...", vue:false} }));
            else 
                await event.locals.session.update(() => ({ flash: { type:'success', message:'Compte créé avec succès ! Un email vous à été envoyez', vue:false} }));

            throw redirect(303, "/");
        }
    }
  }
};