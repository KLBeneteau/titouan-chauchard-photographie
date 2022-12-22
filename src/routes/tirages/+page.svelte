<script lang='ts'>
    import { page } from '$app/stores';
    const session = $page.data.session;
    let user = session?.user

    import type { PageServerData } from './$types';
    export let data: PageServerData;
    let produits = data.produits

</script>

<main>
    <div class="head">
        <h1>Tirages d'Arts</h1>
        {#if user?.role === "admin"}
            <form method="POST" action="?/create">
                <input type="submit" value="+"/>
            </form>
        {/if}
    </div>
    <p>Tirages sur papier fine-art Ultra Smooth Hahnemühle 305g / imprimantes Epson Fine Art Surface lisse, blanc naturel mat, toucher très soyeux.</p>
    <div class="produitList">
        {#each produits as produit }
            {#if produit.nom !== "nouveau_tirage" || user.role === "admin" }
                <a class="produit" data-sveltekit-reload href="/tirages/{produit.nom}">
                    <div class="image">
                        <img alt="photographie" src="{produit.image ?? ''}" />
                        {#if user?.role === "admin"}
                            <form  method="POST" action="?/delete">
                                <button class="suppr">
                                    <img alt="photographie" src="/bouton-supprimer.png"/>
                                    <input type="hidden" name="nom" value="{produit.nom}"/>
                                </button>
                            </form>
                        {/if}
                    </div>
                    <p>{produit.nom.replace(/_/," ")}</p>
                </a>
            {/if}
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

    .image {
        background-color: #4F4D4D;
        width: 370px;
        height: 500px;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
    }

    .image img {
        max-width: 90%;
        max-height: 90%;
    }
    .produitList { 
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        width: 90%;
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