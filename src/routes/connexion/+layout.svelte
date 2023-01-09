<script lang='ts'>
    import FullHeader from '$lib/component/fullHeader.svelte';

    import type { PageParentData } from './$types';
    export let data: PageParentData;
</script>

<FullHeader menuDeroulant={data.menuDeroulant}>
    <a data-sveltekit-reload slot="nav-user" href="/inscription">S'inscrire</a>
</FullHeader>
<slot/>