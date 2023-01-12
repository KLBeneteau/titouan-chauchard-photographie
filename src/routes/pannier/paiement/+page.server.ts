import type { Actions } from './$types';
import type { PageServerLoad } from './$types';
import dotenv from "dotenv";
import Stripe from 'stripe';

export const load: PageServerLoad = async ({parent,locals}) => {

  const { pannier } = await parent();

  dotenv.config();
  const {STRIPE_SECRET_KEY, STRIPE_PUBLIC_KEY} = process.env;
  const stripe = new Stripe(STRIPE_SECRET_KEY??'',{apiVersion: '2022-11-15',});

  let amount : number = 100 * pannier.contenu.reduce(
    (sum:number, produit:any) => sum + (produit.prix*produit.quantite),
    0 );

  let description : string = pannier.contenu.reduce(
    (str:string, produit:any) => str + `x${produit.quantite} ${produit.nom} ${produit.dimension}<br/>`,
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
  default: async ({}) => {


    
  }
};