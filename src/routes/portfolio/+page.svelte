<script lang='ts'>
    import type { PageServerData } from './$types';
    export let data: PageServerData;
    let lignes = data.lignes

    import { page } from '$app/stores';
    const session = $page.data.session;
    let user = session?.user
</script>

<svelte:head>
  <meta property="description" content="Au gré de mes voyages, j'ai réalisé plusieurs projets photographiques. Ils refletent chacun un petit morceau de mes aventures." />
  <title>Titouan Chauchard - Portfolio</title>
</svelte:head>

<img class="banderole" alt="banderole" src="/bannierePortfolio.png" />
<main>
    <div class="head">
        <h1>Portfolio</h1>
        {#if user?.role === "admin"}
            <form method="POST" action="?/create">
                <input type="submit" value="+"/>
            </form>
        {/if}
    </div>
    <p>Au gré de mes voyages, j'ai réalisé plusieurs projets photographiques. Ils refletent chacun un petit morceau de mes aventures. Ces petits moments hors du temps, m'ont inspriré différentes séries d'images que j'ai le plaisir de partager avec vous.</p>
    <div class="blockListe">
        {#each lignes as ligne, i}
        <div class="block" class:end="{ i%2!=0 && (!ligne.grand || !ligne.petit1)}">
            {#if ligne.grand}
            <div class="grand">
                <a class="vignette" data-sveltekit-reload href="/portfolio/{ligne.grand.nom}" style="background-image: url({ligne.grand.vignette ?? '/defaultGrand.png'});">
                    <p>{ligne.grand.nom.replace(/_/," ")}</p>
                </a>
                {#if user?.role === "admin"}
                    <form  method="POST" action="?/delete">
                        <button class="suppr">
                            <img alt="photographie" src="/bouton-supprimer.png"/>
                            <input type="hidden" name="nom" value="{ligne.grand.nom}"/>
                        </button>
                    </form>
                {/if}
            </div>
            {/if}
            {#if ligne.petit1}
                <div class="ligne">
                    <div class="petit">
                        <a class="vignette" data-sveltekit-reload href="/portfolio/{ligne.petit1.nom}" style="background-image: url({ligne.petit1.vignette ?? "/defaultPetit.png"});">
                            <p>{ligne.petit1.nom.replace(/_/," ")}</p>
                        </a>
                        {#if user?.role === "admin"}
                            <form  method="POST" action="?/delete">
                                <button class="suppr">
                                    <img alt="photographie" src="/bouton-supprimer.png"/>
                                    <input type="hidden" name="nom" value="{ligne.petit1.nom}"/>
                                </button>
                            </form>
                        {/if}
                    </div>
                    {#if ligne.petit2}
                        <div class="petit">
                            <a class="vignette" data-sveltekit-reload href="/portfolio/{ligne.petit2.nom}" style="background-image: url({ligne.petit2.vignette ?? "/defaultPetit.png"});">
                                <p>{ligne.petit2.nom.replace(/_/," ")}</p>
                            </a>
                            {#if user?.role === "admin"}
                                <form  method="POST" action="?/delete">
                                    <button class="suppr">
                                        <img alt="photographie" src="/bouton-supprimer.png"/>
                                        <input type="hidden" name="nom" value="{ligne.petit2.nom}"/>
                                    </button>
                                </form>
                            {/if}
                        </div>
                    {/if}
                </div>
            {/if}
        </div>
    {/each}
    </div>
</main>


<style>
    main { 
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    p, h1 { 
        max-width: 1200px;
        margin: 1em 0em;
        text-align: center;
    }
    .head { 
        display: flex;
        align-items: baseline;
        gap: 15px;
    }
    .head input{
        font-size: x-large;
        font-weight: bolder;
        border: 1px solid #FFFFFF;
        border-radius: 50px;
        padding: 0 0.4em 0.1em 0.4em;
    }
    .blockListe {
        display: flex;
        flex-wrap: wrap;
        width: 90%;
        margin: auto;
        justify-content: space-between;
    }
    .block {
        width: 48%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 600px;
        margin: 1em 0;
    }
    .block:nth-child(2n){
        flex-direction: column-reverse;
    }
    .end {
        justify-content: flex-end;
    }
    .block > * { width: 100%;}
    .grand { 
        height: 63%; 
        width: 100%;
        position: relative;
    }
    .ligne { 
        height: 33%;
        display: flex;
        justify-content: space-between;
    }
    .petit { 
        height: 100%; 
        width: 45%;
        position: relative;
    }
    .vignette { 
        background-size: cover;
        background-position: center;
        display: flex; 
        align-items: center; 
        justify-content: center;
        padding: 0;
        height: 100%;
        width: 100%;
    }
    .vignette  p { 
        padding: 0.8em 3em;
        background-color: #0D0C0CB3;
        font-size: larger;
        font-style: italic;
    }
    .suppr {
        position: absolute;
        bottom: 0;
        right: 0;
        padding: 0;
        margin: 0.2em;
        height: 35px;
    }
    .suppr img {
        height: 35px;
    }
</style>