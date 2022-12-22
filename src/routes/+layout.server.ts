import type { LayoutServerLoad } from './$types';
import AlbumModel from '$lib/models/Album';

export const load: LayoutServerLoad = async ({ locals }) => {
   const albums = await AlbumModel.find()
   let menuDeroulant : any = {}
   menuDeroulant["albums"] = JSON.parse(JSON.stringify(albums)).map((a:any) => a.nom)

   return { 
      menuDeroulant : menuDeroulant,
      session: locals.session.data
   }
}