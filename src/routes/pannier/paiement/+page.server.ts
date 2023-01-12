import type { Actions } from './$types';
import type { PageServerLoad } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import dotenv from "dotenv";
import Stripe from 'stripe';
import { sendMail } from '$lib/utils/mailer';
import CommandeModel from '$lib/models/Commande';
import UserModel from '$lib/models/User';

let amount : number 
let description : string

export const load: PageServerLoad = async ({parent}) => {

  const { pannier } = await parent();

  dotenv.config();
  const {STRIPE_SECRET_KEY, STRIPE_PUBLIC_KEY} = process.env;
  const stripe = new Stripe(STRIPE_SECRET_KEY??'',{apiVersion: '2022-11-15',});

  amount = 100 * pannier.contenu.reduce(
    (sum:number, produit:any) => sum + (produit.prix*produit.quantite),
    0 );

  if(amount === 0) throw redirect(303,'/')

  amount+=900

  description = pannier.contenu.reduce(
    (str:string, produit:any) => str + `x${produit.quantite} ${produit.nom} ${produit.dimension} --- `,
    '' );

  const paymentIntent = await stripe.paymentIntents.create({
    amount : amount,
    currency : 'eur',
    description : description , //aparrait sur le tableau de bord stripe
    statement_descriptor : "TC Photographie"
  })

  return { 
    clientSecretKey : paymentIntent.client_secret,
    publicKey : STRIPE_PUBLIC_KEY
  }
}


export const actions: Actions = {
  try: async ({request, locals}) => {

    let data = await request.formData();
    let status = data.get('status')?.toString()

    const user = locals.session.data.user
    
    if(status === 'success'){
      try {
        //modifie le statut de la commande
        const commande = await CommandeModel.findOneAndUpdate({ utilisateur : user.id,statut : 'en pannier'},{
          dernierModif : Date.now(),
          statut : 'en cours'
        })

        let facture = commande?.contenu.reduce(
          (str:string, produit:any) => str + `x${produit.quantite} ${produit.nom} en ${produit.dimension}cm à ${produit.prix.toFixed(2)}€ l'unité TTC<br/> `,
          '' );

        let prix : number|undefined = commande?.contenu.reduce(
          (sum:number, produit:any) => sum + (produit.prix*produit.quantite),
          9 );

        //envoie un mail de confirmation 
        const mail = await sendMail(
          user.email,
          "Confirmation d'achat",
          `<h1>Bravo ${user.nom} ${user.prenom} !</h1>
          <p>Nous confirmation l'achat de votre commande chez Titouan Chauchard Photographie !</p>
          <p><i>${facture}
          livraison : 9.00€ <br/>
          pour un total de ${prix?.toFixed(2)}€</i></p>
          <p>Si besoin, vous pouvez nous contactez par mail à titouan.chauchard.photographie@gmail.com <br/></p>`
        )

        if(!mail) throw new Error("");

        await UserModel.updateOne({email : user.email},{
          $set : { pannier : null },
          $push: { historiques : commande?._id }
        })
          
        await locals.session.update(() => ({ flash: { type:'success', message:"Votre commande à bien été validé ! Tu à reçus un mail", vue:false} }));
      } 
      catch {
        console.log('ERREUR APRES VALIDATION DU PAIEMENT')
        const mail = await sendMail(
          'titouan.chauchard.photographie@gmail.com',
          "ERREUR INTERNE",
          `<p>p${user.nom} ${user.prenom} viens d'acheter :</p>
          <p><i>${description}
          pour un total de ${amount?.toFixed(2)}€ TTC</i></p>

          <p>Le paiement à été effectué, mais l'envoie de mail et le changement de status de la commande ont échoué !</p>
          <p>La conséquence la plus génant pour le client est que sont pannier n'à pas été effacé, et qu'il n'ai pas reçus de confirmation par mail</p>
          <p>Pour toi, fait attention <b>cet achat n'aparaitra pas sur ton back office, pense bien à lui envoyez sa commande !</b></p>
          <br/>
          <p>contact le à ${user.email}<p/>
          <br/>
          <p>Si cette erreur arrive souvent, contact Kaël !</p>`
        )
        await locals.session.update(() => ({ flash: { type:'success', message:"Votre commande à bien été validé !", vue:false} }));
      }

      throw redirect(303,'/') ;
    }
    else {
      await locals.session.update(() => ({ flash: { type:'error', message:"Echec du paiement", vue:false} }));
      return fail(400, {})
    }
  }
};