import type { LayoutServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import CommandeModel from '$lib/models/Commande';


export const load: LayoutServerLoad = async ({ locals }) => {

    if(!locals.session.data.user)
        throw redirect(303, "/");


    const pannier = await CommandeModel.findOne({
        utilisateur : locals.session.data.user.id, 
        statut : 'en pannier'
    })

    return {
        pannier : JSON.parse(JSON.stringify(pannier)) ?? {contenu : []}
    }
}