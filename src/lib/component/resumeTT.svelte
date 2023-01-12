<script lang="ts" async>

    export let pannier : any 
    
    let tabQuantite : number[] = pannier.contenu.map((p:any) => p.quantite);
    let prix : number = pannier.contenu.reduce((tt: number,produit: any,i: number)=>tt + (produit.prix*tabQuantite[i]),0)
</script>

<div class="resumeTT">
    <p>Article{tabQuantite.reduce((sum,value)=>sum + value,0) > 1 ? 's' : ''} :
        <span>{prix.toFixed(2)} €</span>
    </p>
    <p>Frais de port :
        <span>9.00 €</span>
    </p>
    <p>Montant total :  
        <span>{(prix+9).toFixed(2)} €</span>
    </p>
</div>

<style>
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
</style>