<script lang='ts'>
    import { page } from '$app/stores'; 
    const session = $page.data.session;
    let user = session?.user

    import type { PageServerData } from './$types';
    export let data: PageServerData;
    let tirage = data.tirage

    import { writable } from 'svelte/store';
    let newTarifs : any = writable([]);
    $newTarifs = tirage.tarif

    let enModification = false;

    let image : any;

    let curentPrix = tirage.tarif[0]?.prix
    let curentDimension = tirage.tarif[0]?.dimension

    function onImageSelected(e:any){

        let reader = new FileReader();
        reader.onload = function(event) {  image = reader.result;};
        reader.readAsDataURL(e.target.files[0]);
        
    }
</script>
<main>
    <div class="head">
        <a class="retour" data-sveltekit-reload href="/tirages"><img src="/retour.png" alt="icone de Sebastian Belalcazar"/></a>
        <h1>Tirages d'Arts</h1> 
        {#if user?.role === "admin"}
            <button type="button" class="pen" on:click={()=>enModification=!enModification}>
                <img src="/modifier.png" alt="icone de Sebastian Belalcazar"/>
            </button>
        {/if}
    </div>
    <div class="body">
        <div class="image">
            {#if enModification}
                <div class="input">
                    <label for="image">Image</label>
                    <input type="file" name="image" accept=".jpg, .jpeg, .png" on:change={(e)=>onImageSelected(e)}/>
                </div>
            {:else}
                <img alt="photographie" src="{tirage.image ?? ''}" />
            {/if}
        </div>
        <div>
            {#if enModification}
                <form method="POST" action="?/update" class="update">
                    <input type="hidden" name="image" value="{image}"/>
                    <input type="hidden" name="tarifs" value="{JSON.stringify($newTarifs)}"/>
                    <div class="input">
                        <label for="nom">Nom du tirage</label>
                        <input type="text" name="nom" value={tirage.nom.replace(/_/," ")}>
                    </div>
                    <div class="input textarea">
                        <label for="nom">Description du tirage</label>
                        <textarea name="description">{tirage.description ?? ''}</textarea>
                    </div>
                
                    <div class="tabTarif">
                        <div class="tarif">
                            <div>Dimension</div>
                            <div>Prix</div>
                        </div>
                        {#each $newTarifs as tarif, i}
                            <div class="tarif">
                                <input type="text" value={tarif.dimension} on:input={(e)=>{$newTarifs[i].dimension = e.currentTarget.value}}>
                                <input type="number" min="0" step="0.01" value={tarif.prix} on:input={(e)=>{$newTarifs[i].prix = e.currentTarget.value}}>
                            </div>
                        {/each}
                        <button class="tabTarif-button" on:click={(e)=>{ 
                            e.preventDefault(); 
                            $newTarifs[$newTarifs.length] = {dimension:"X*X", prix:49.00} }}
                        >
                            +
                        </button>
                        <button class="tabTarif-button" on:click={(e)=>{ 
                            e.preventDefault(); 
                            $newTarifs = $newTarifs.slice(0,$newTarifs.length-1); }}
                        >
                            -
                        </button>
                    </div>
                    <input type="submit" value="modifier">
                </form>
            {:else}
                <form method="POST" action="?/ajouterPannier" class="ajouterPannier">
                    <h2>{tirage.nom.replace(/_/," ")}</h2>
                    <p>{tirage.description}</p>
                    <h3>Dimension (cm)</h3>
                    <div class="dimensionListe">
                        {#each tirage.tarif as t}
                            <button on:click={(e)=>{ 
                                e.preventDefault(); 
                                curentPrix=t.prix; 
                                curentDimension=t.dimension}}
                                class:selected={curentDimension===t.dimension}
                            >
                                {t.dimension}
                            </button>
                        {/each}
                    </div>
                    <div class="prix">
                        <h3>Prix</h3>
                        <p>{curentPrix?.toPrecision(4)}€</p>
                    </div>
                    <input type="hidden" name="id" value="{tirage._id}">
                    <input type="hidden" name="dimension" value="{curentDimension}">
                    <input type="submit" value="Ajouter au pannier">
                </form>
            {/if}
            </div>
        </div>
</main>

<style>
    main { 
        display: flex;
        flex-direction: column;
        width: 80%; 
        margin: 0 auto 2em;
        align-items: center;
    }
    .head { 
        display: flex; 
        align-items: center;
    }
    .head > * { margin: 1em 0.3em;}
    .pen img { height: 40px;}

    .prix {
        margin: 1.4em 0;
        text-align: center;
    }
    .prix * {
        margin: 0.2em;
    }

    .body { 
        display: flex;
        justify-content: space-between;
        width: 100%;
    }
    .body > div { width: 48%;}
    .image .input { display: flex; align-items: center;}
    textarea { 
        height: 200px;
        margin: 5px 0;
        background-color: var(--TC-clair);
    }
    input[type="text"] { 
        background-color: var(--TC-clair);
    }

    .tabTarif {
        background-color: var(--TC-clair);
        display: flex;
        color: var(--TC-noir);
        width: fit-content;
        overflow-x: auto;
        max-width: 100%;
    }
    .tabTarif > * {
        border-left: 1px solid var(--TC-sombre);
    }
    .tabTarif > * > *:first-child{
        border-bottom: 1px solid var(--TC-sombre);
    }
    .tarif input {
        width: 50px;
        background-color: none;
        text-align: center;
        background-color: inherit;
        border: none;
    }
    .tarif {
        justify-content: space-evenly;
        flex-direction: column;
        display: flex;
        height: 60px;
    }
    .tarif > * {
        height: 30px;
        padding: 0.2em;
    }
    .tabTarif-button {
        height: 60px;
        font-weight: 900;
    }
    .image {
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #4F4D4D;
        max-width: 600px;
        max-height: 600px;
    }
    .image img { 
        max-width: 90%;
        max-height: 90%;
    }
    .ajouterPannier {
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .ajouterPannier button {
        background-color: var(--TC-clair);
        color: var(--TC-noir);
        padding: 0.5em 1.5em;
        margin: 0 0.5em;
        border-radius: 0;
        transition : 0.5s;
        border: 2px solid var(--TC-clair);
    }
    input[type="submit"] { 
        background-color: var(--TC-clair);
        color: var(--TC-noir);
        width: fit-content;
        align-self: center;
        padding: 0.8em 2em;
    }
    .update {
        gap: 25px;
        display: flex;
        flex-direction: column;
    }
    button.selected { 
        background-color: var(--TC-beige);
        border: 2px solid var(--TC-beige);
        border-radius: 7px;
    }
    .retour {
        height: 50px;
        position: absolute;
        left: 15px;
        margin: 0;
    }
    .retour img {
        height: 50px;
    }
</style>