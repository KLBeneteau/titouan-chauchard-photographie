

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
interface SessionData {
	user: any;
	flash: any;
}

declare namespace App {
	
	interface Locals {
		session: import('svelte-kit-cookie-session').Session<SessionData>;
	}

	interface PageData {
		session: SessionData;
	}
	// interface Error {}
	// interface Platform {}
}
