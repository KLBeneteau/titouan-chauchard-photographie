<script lang='ts'>
    import FullHeader from '$lib/component/fullHeader.svelte';
    import NavUser from "$lib/component/navUser.svelte";
    import { page } from '$app/stores';

    import type { PageParentData } from './$types';
    export let data: PageParentData;

    const session = $page.data.session;
    let user = session?.user
</script>

{#if user}
    <FullHeader menuDeroulant={data.menuDeroulant}>
        <NavUser slot="nav-user"/>
    </FullHeader>  
{:else} 
    <FullHeader menuDeroulant={data.menuDeroulant}>
        <a data-sveltekit-reload slot="nav-user" href="/connexion">Se connecter</a>
    </FullHeader> 
{/if}
<slot/>
