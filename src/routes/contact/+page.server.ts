import type { Actions } from './$types';
import { fail } from '@sveltejs/kit';
import nodemailer from "nodemailer"

export const actions: Actions = {
  default: async (event:any) => {

    let data = await event.request.formData();
    // console.log(event) -> plein d'info la dedans 
    //console.log(data)

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

    //----TODO : Envoie du mail------
    else {
        /*

        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'kael.beneteau@gmail.com',
              pass: '4uGbx#6b9vy'
            }
        });

        let mailOptions = {
            from: 'kael.beneteau@gmail.com',
            to: 'kael.beneteau@gmail.com',
            subject: data.get('object'),
            text: data.get('message')
        };

        transporter.sendMail(mailOptions, (error:any, info:any) => {
            if (error) console.log(error);
            else  console.log('Email sent: ' + info.response);
        });
        */
    }
  }
};