<script lang='ts'>
    import { page } from '$app/stores'; 
    const session = $page.data.session;
    let user = session?.user

    import type { PageServerData } from './$types';
    export let data: PageServerData;
    let album = data.album

    let enModification = false;

    let banderole : any;
    let vignette : any;
    let photographies :any[] = [];

    function onBanderoleSelected(e:any){

        let reader = new FileReader();
        reader.onload = function(event) {  banderole = reader.result;};
        reader.readAsDataURL(e.target.files[0]);
        
    }   
    function onVignetteSelected(e:any){

        let reader = new FileReader();
        reader.onload = function(event) {  vignette = reader.result;};
        reader.readAsDataURL(e.target.files[0]);

    } 
    function onPhotographiesSelected(e:any){
        for(let photo of e.target.files){
            let reader = new FileReader();
            reader.onload = function(event) {  
                    photographies.push(reader.result);
                    let input = document.querySelector("#photographiesFiles")
                    if(input)
                        input.setAttribute('value',JSON.stringify(photographies))
            };
            reader.readAsDataURL(photo);
        }
    }
</script>

<svelte:head>
  <meta property="description" content="{album.description ?? ''}" />
  <title>{album.nom.replace(/_/," ")}</title>
</svelte:head>

<main>
    <img class="banderole" alt="banderole" src="{album.banderole ?? "/defaultBanniere.png" }" />
    <form method="POST" action="?/update"
        class:center="{!enModification}"
        class:maxwidth="{enModification}"
    >
        <div class="head" class:self-center={enModification}>
            <a class="retour" data-sveltekit-reload href="/portfolio"><img src="/retour.png" alt="icone de Sebastian Belalcazar"/></a>
            {#if enModification}
                <h1>Modification de l'album</h1>
            {:else}
                <h1>{album.nom.replace(/_/," ")}</h1>
            {/if}
            {#if user?.role === "admin"}
                <button type="button" class="pen" on:click={()=>enModification=!enModification}>
                    <img src="/modifier.png" alt="icone de Sebastian Belalcazar"/>
                </button>
            {/if}
        </div>
        {#if enModification}
                <div class="input">
                    <label for="nom">Titre de l'album</label>
                    <input type="text" name="nom" value={album.nom.replace(/_/," ")}>
                </div>
                <div class="input textarea">
                    <label for="description">Description de l'album</label>
                    <textarea name="description">{album.description ?? ''}</textarea>
                </div>
                <div class="checkbox input">
                    <input type="checkbox" name="formatVignette" checked={album.formatVignette}>
                    <label for="checkbox">Vignette en grand format ?</label>
                </div>
                <div class="input">
                    <label for="vignette">Image de la vignette</label>
                    <input type="file" name="vignette" accept=".jpg, .jpeg, .png,.webp" on:change={(e)=>onVignetteSelected(e)}/>
                    <input type="hidden" name="vignetteFile" value="{vignette}"/>
                </div>
                <div class="input">
                    <label for="banderole">Image de la banderole</label>
                    <input type="file" name="banderole" accept=".jpg, .jpeg, .png,.webp" on:change={(e)=>onBanderoleSelected(e)}/>
                    <input type="hidden" name="banderoleFile" value="{banderole}"/>
                </div>
                <div class="input">
                    <label for="banderole">Ajouter des photographies</label>
                    <input type="file" name="photographies" accept=".jpg, .jpeg, .png,.webp" on:change={(e)=>onPhotographiesSelected(e)} multiple /> 
                    <input type="hidden" id="photographiesFiles" name="photographiesFiles" value="{JSON.stringify(photographies)}" />
                </div>
                <input type="submit" value="Valider"/>
        {:else}
            <p>{album.description ?? "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." }</p>
        {/if}
    </form>
    <div class="imageListe">
        {#each album.images as photo, i}
            <div>
                <img class="photographie" alt="photographie" src="{photo}" />
                {#if user?.role === "admin"}
                    <form  method="POST" action="?/delete">
                        <button class="suppr">
                            <img alt="photographie" src="/bouton-supprimer.png"/>
                            <input type="hidden" name="index" value="{i}"/>
                        </button>
                    </form>
                {/if}
            </div>
        {/each}
    </div>
</main>

<style>
    main, form { 
        display: flex;
        flex-direction: column;
    }
    form { 
        width: 80%; 
        margin: auto;
        gap: 20px
    }
    .head { 
        display: flex; 
        align-items: center;
    }
    p { 
        max-width: 1200px;
        text-align: center;
    }



    .textarea {
        max-width: 1200px;
        width: 100%;
    }
    textarea {     
        height: 100px;
        width: 100%;
        background-color: var(--TC-clair);
        margin: 5px 0;
    }
    .input { align-items: flex-start; }
    input[type="text"] { background-color: var(--TC-clair);}
    .input.checkbox { 
        flex-direction: initial;
        gap: 15px;
    }
    input[type="submit"] {
        padding: 0.8em 2em;
        color: var(--TC-noir);
        margin-top: 1em;
        background-color: var(--TC-clair);
        width: fit-content;
        align-self: center;
    }



    .pen img { height: 40px;}
    .center { align-items: center; }
    .imageListe {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        margin: 3em auto;
        width: 90%;
        row-gap: 15px;
    }
    .imageListe > div { position: relative;}
    .imageListe button { padding: 0.3em;}
    .photographie {
        height: 450px;
        width: 337px;
        object-fit: cover;
        object-position: center;
    }
    .suppr {
        position: absolute;
        bottom: 0;
        right: 0;
    }
    .suppr img {
        height: 50px;
    }
    .retour {
        position: absolute;
        left: 15px;
        margin: 0;
    }
    .retour img {
        height: 50px;
    }
    .self-center{ align-self: center;}
    .maxwidth{ max-width: 600px;}

    
    /*Bureau*/
    @media (min-width: 1100px) {
        p {
            margin: 0 2em;
        }
        .head > * { margin: 1em 0.3em;}
    }
    /*mobile*/
       @media (max-width: 1100px) {
        .imageListe {
            justify-content: center;
        }
        .head {
            text-align: center;
            flex-direction: column-reverse;
        }
    }
</style>