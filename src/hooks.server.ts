import { handleSession } from 'svelte-kit-cookie-session';
 
export const handle = handleSession(
	{
		secret: 'VUZN!8pVrf5zUc_Zf7GV:Vx!Ynwr71oE:2nP,L3bpqHz6zPhp7WY+DM)gagXNPRRb2X5^}^^F8j.C#d!jCpTZCAbMCY=zkt7o6jY'
	},
	({ event, resolve }) => {
		
		let f = event.locals.session.data.flash
		
		if(f){
			if(f.vue)
				event.locals.session.update(() => ({ flash: null }));
			else 
				event.locals.session.update(({flash}) => ({ flash: { type:flash.type, message:flash.message, vue:true} }));
		}

		if(event.route.id === null)
			return Response.redirect(event.url.origin)
		
		return resolve(event);
	}
);
