<script lang="ts">
    import Header from  "$lib/component/header.svelte"
    import NavUser from "$lib/component/navUser.svelte";

    import { page } from '$app/stores';
    const session = $page.data.session;
    let user = session?.user
    
</script>

<svelte:head>
  <meta property="description" content="Passionné par la photographie, je parcours le monde avec mon fidèle camion. Venez découvrire mon travail et mes services personalisés." />
  <title>Titouan Chauchard - Artiste Photographe</title>
</svelte:head>

{#if user}
    <Header>
        <NavUser slot="nav-user"/>
    </Header>  
{:else} 
    <Header>
        <a data-sveltekit-reload  slot="nav-user" href="/connexion">
            <div class="bureau">Se connecter </div>
            <img class="mobile" alt="logo connexion" src="/enter.png" />
        </a>
    </Header> 
{/if}
<nav class="main">
    <div class="coloneImage">
        <div class="formatPetit">
            <a data-sveltekit-reload href="/presentation" id="presentation">
                <p>Présentation</p>
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
    .formatMoyen,
    .formatPetit { 
        display: flex; 
        justify-content: space-between;
    }
    .formatPetit > a { height: 100%; }


    /*bureau*/
    @media (min-width: 1100px) {
        .main {
            gap: 5px;
            height: calc(100vh - 280px);
            margin-top: 20px;
            justify-content: space-evenly;
        }
        .coloneImage {
            width: 45%;
        }
        .formatPetit { 
            height: 33%;
        }
        .formatPetit > a { width: 47%;}
    }
    /*mobile*/
    @media (max-width: 1100px) {
        .main,
        .formatPetit { 
            flex-direction: column;
        }

        .main {
            margin: 1em 0;
        }

        .coloneImage a {
            width: 80%;
            align-self: center;
            margin: 0.3em;
        }

        p { 
            padding: 0.4em 0em;
            margin: 1.5em 0em;
            width: 70%;
            text-align: center;
            max-width: 350px;
        }
    }
</style>

