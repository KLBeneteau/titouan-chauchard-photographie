<script lang="ts">
    import Header from  "$lib/component/header.svelte"
    import NavUser from "$lib/component/navUser.svelte";

    import { page } from '$app/stores';
    const session = $page.data.session;
    let user = session?.user
    
</script>

{#if user}
    <Header>
        <NavUser slot="nav-user"/>
    </Header>  
{:else} 
    <Header>
        <a data-sveltekit-reload slot="nav-user" href="/connexion">Se connecter</a>
    </Header> 
{/if}
<nav class="main">
    <div class="coloneImage">
        <div class="formatPetit">
            <a data-sveltekit-reload href="/presentation" id="presentation">
                <p>Presentation</p>
            </a>
            <a data-sveltekit-reload href="/portfolio" id="portfolio">
                <p>Portfolio</p>
            </a>
        </div>
        <a data-sveltekit-reload class="formatGrand" href="/tirages" id="tirage-dart">
            <p>Tirages d'Art</p>
        </a>
    </div>
    <div class="coloneImage">
        <a data-sveltekit-reload class="formatGrand" href="/voyages" id="voyages">
            <p>Voyages</p>
        </a>
        <a data-sveltekit-reload class="formatMoyen" href="/contact" id="contact">
            <p>Contact</p>
        </a>
    </div>
</nav>

<style>
    .main {
        display: flex;
        align-items: stretch;
        justify-content: space-evenly;
        gap: 5px;
        height: calc(100vh - 280px);
        margin-top: 20px;
    }
    #presentation { background-image: url("/presentation.png"); } 
    #portfolio { background-image: url("/portfolio.png"); } 
    #tirage-dart { background-image: url("/tirage-dart.png"); } 
    #voyages { background-image: url("/voyages.png"); } 
    #contact { background-image: url("/contact.png"); } 
    p { 
        padding: 0.8em 3em;
        background-color: #0D0C0CB3;
        font-size: larger;
    }
    .coloneImage { 
        width: 45%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
    .coloneImage a { 
        display: flex; 
        align-items: center; 
        justify-content: center;
        padding: 0;
        background-size: cover;
        background-position: center;
    }
    .formatGrand { height: 63%;}
    .formatMoyen,.formatPetit { height: 33%;}
    .formatPetit{ display: flex; justify-content: space-between;}
    .formatPetit > a { height: 100%; width: 47%;}
</style>

