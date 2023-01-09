<script lang='ts'>
    import FullHeader from '$lib/component/fullHeader.svelte';
    import NavUser from "$lib/component/navUser.svelte";

    import type { PageParentData } from './$types';
    export let data: PageParentData;
</script>

<FullHeader menuDeroulant={data.menuDeroulant}>
    <NavUser slot="nav-user"/>
</FullHeader>
<img class="banderole" alt="banderole" src="/banniereTirage.png" />
<slot/>