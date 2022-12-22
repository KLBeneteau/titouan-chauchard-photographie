<script lang="ts" async>
    import Header from  "$lib/component/header.svelte"

    export let menuDeroulant : any 
    
    let portfolio = false;
</script>

<Header>
    <a data-sveltekit-reload slot="nav-1" href="/presentation">Présentation</a>
    <div slot="nav-2" class="menu-deroulant"
        on:mouseenter={() => portfolio=true}
        on:mouseleave={() => portfolio=false}
    >
        <a data-sveltekit-reload  href="/portfolio">
            Portfolio
        </a>
        {#if portfolio}
            <div class="menu">
                {#each menuDeroulant['albums'] as album }
                    <a data-sveltekit-reload href={"/portfolio/"+album}>{album.replace(/_/," ")}</a>
                {/each}
            </div>
        {/if}
    </div>
    <a data-sveltekit-reload slot="nav-3" href="/tirages">Tirages d'Art</a>
    <a data-sveltekit-reload slot="nav-4" href="/voyages">Voyages</a>
    <a data-sveltekit-reload slot="nav-5" href="/contact">Contact</a>
    <slot slot="nav-user" name="nav-user" />
</Header>