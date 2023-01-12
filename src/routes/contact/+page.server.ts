import type { Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { sendMail } from '$lib/utils/mailer';


export const actions: Actions = {
  default: async (event:any) => {

    let data = await event.request.formData();

    let formReponse : any  = {
        nom : data.get('nom'),
        prenom : data.get('prenom'),
        telephone : data.get('telephone'),
        email : data.get('email'),
        objet : data.get('objet'),
        message : data.get('message'),
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
    
    if(Object.getOwnPropertyNames(formReponse.error).length > 0) 
        return fail(400, formReponse);

    else {

        const mail = await sendMail(
            'titouan.chauchard.photographie@gmail.com',
            formReponse.object,
            `<p><b>${formReponse.nom} ${formReponse.prenom} vous à envoyer une demande de contact !</b></p>
            <p>${formReponse.message}</p>
            <p>Vous pouvez le contacter par mail à ${formReponse.email} <br/>
            ou par telephone au ${formReponse.telephone}</p>`
        )

        if(!mail)
            await event.locals.session.update(({}) => ({ flash: { type:'error', message:"Votre message n'à pas pu etre envoyé :(", vue:false} }));
        else 
            await event.locals.session.update(({}) => ({ flash: { type:'success', message:'Votre message à été envoyer !', vue:false} }));

        throw redirect(303, "/");
    
    }
  }
};