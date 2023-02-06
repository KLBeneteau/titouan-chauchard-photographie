<script lang="ts" async>
    import Header from  "$lib/component/header.svelte"

    export let menuDeroulant : any 
    
    let portfolio = false;

    import { menuBurgerMobile } from "./store";
</script>

<Header>
    <!--En bureau -->
    <a data-sveltekit-reload class="bureau" slot="nav-1" href="/presentation">Présentation</a>
    <div slot="nav-2" class="menu-deroulant bureau"
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
    <a data-sveltekit-reload slot="nav-3" href="/tirages" class="bureau" >Tirages d'Art</a>
    <a data-sveltekit-reload slot="nav-4" href="/voyages" class="bureau">Voyages</a>
    <a data-sveltekit-reload slot="nav-5" href="/contact" class="bureau">Contact</a>
    <!--En mobile -->
    <button class="mobile" slot="nav-mobile"
        on:click={() => { menuBurgerMobile.update(val => !val)}}
    >
        <img class="logoMobile" src="/burger.png" alt="Bouton pour afficher le menu burger"/>
    </button>
    <!--Tout le temps -->
    <slot slot="nav-user" name="nav-user" />
</Header>