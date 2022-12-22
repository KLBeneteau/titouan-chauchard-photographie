import type { Actions } from './$types';
import { redirect  } from '@sveltejs/kit';
 
export const actions: Actions = {

  logout: async ({ locals }) => {
    await locals.session.destroy();
		throw redirect(303, "/");
  }

};