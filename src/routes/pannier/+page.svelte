<script lang='ts'>
    import type { LayoutServerData } from './$types';
    export let data: LayoutServerData;

    let tabQuantite : number[] = data.pannier.contenu.map((p:any) => p.quantite)

    function changeQuantity(index:number,ajout:number){
        if(tabQuantite[index]+ajout >= 1)
            tabQuantite[index] += ajout
        else 
            tabQuantite[index] = 1
    }
</script>

<main>
    <a class="retour" data-sveltekit-reload href="/"><img src="/retour.png" alt="icone de Sebastian Belalcazar"/></a>
    <h1>Mon pannier</h1> 
    <div class="tab">
        <div class="ligne">
            <p>Produit</p>
            <p>Quantité</p>
            <p>Prix (€)</p>
            <p>Total (€)</p>
        </div>
        {#each data.pannier.contenu as produit, i }
            {#if tabQuantite[i] > 0 }
                <div class="ligne">
                    <div class="resume">
                        <b>{produit.nom.replace(/_/," ")}</b>
                        <p>{produit.dimension} cm</p>
                        <button on:click={()=>tabQuantite[i]=0}>Supprimer</button>
                    </div>
                    <div class="quantite">
                        <button on:click={()=>changeQuantity(i,-1)}>-</button>
                        <p>{tabQuantite[i]}</p>
                        <button on:click={()=>changeQuantity(i,+1)}>+</button>
                    </div>
                    <p>{produit.prix.toFixed(2)}</p>
                    <p>{(produit.prix * tabQuantite[i]).toFixed(2)}</p>
                </div>
            {/if}
        {/each}
    </div>
    <div class="total">
        <div class="resumeTT">
            <p>Article{tabQuantite.reduce((sum,value)=>sum + value,0) > 1 ? 's' : ''} :
                <span>{data.pannier.contenu.reduce((tt,produit,i)=>tt + (produit.prix*tabQuantite[i]),0).toFixed(2)} €</span>
            </p>
            <p>Frais de port :
                <span>Offerts</span>
            </p>
            <p>Montant total :  
                <span>{data.pannier.contenu.reduce((tt,produit,i)=>tt + (produit.prix*tabQuantite[i]),0).toFixed(2)} €</span>
            </p>
        </div>
        <div class="buttons">
            <form method="POST" action="?/save">
                <input type="hidden"  name="quantite" value="{tabQuantite.toString()}" />
                <button>Sauvegarder mon pannier</button>
            </form>
            <form method="POST" action="?/commander">
                <input type="hidden" name="quantite" value="{tabQuantite.toString()}" />
                <button>Passer ma commande</button>
            </form>
        </div>
    </div>
</main>

<style>
    main {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 80%;
        margin: auto;
        position: relative;
    }
    h1 { margin: 1em;}
    .retour {
        position: absolute;
        left: -10vw;
        margin: 0;
        top: 1em;
    }
    .retour img {
        height: 50px;
    }
    .tab { 
        display: flex;
        flex-direction: column;
        background-color: var(--TC-clair);
        color : var(--TC-noir);
        align-items: stretch;
        justify-content: stretch;
        width: 100%;
        margin-top: 3em;
    }
    .tab * { margin: 0;}
    .ligne > *:first-child { width: 40%; flex-grow: 0;}
    .ligne:not(.ligne:last-child) { border-bottom: 2px solid var(--TC-sombre);}
    .ligne > *:not(.ligne >*:last-child) { border-right: 2px solid var(--TC-sombre);}
    .ligne { 
        width: 100%; 
        min-height: 50px;
        display: flex
    }
    .ligne > * {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 20%;
    }
    .resume { 
        display: flex;
        flex-direction: column;
    }
    .resume * { padding: 0.5em;}
    .quantite { 
        display: flex;
        justify-content: space-evenly;
        font-size: larger;
    }
    .quantite button { font-weight: bolder;}
    .total { 
        align-self: flex-end;
    }
    .resumeTT{
        background-color: var(--TC-clair);
        color : var(--TC-noir);
        padding: 0.3em 1em;
        margin: 2em 0;
        font-size: larger;
    }
    .resumeTT p { 
        display: flex;
        justify-content: space-between;
        gap: 30px;
    }
    .buttons {
        display: flex;
        justify-content: space-between;
        gap: 15px;
        margin-bottom: 2em;
    }
    .buttons button {
        background-color: var(--TC-clair);
        color : var(--TC-noir);
    }
</style>