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

<main>
    <img class="banderole" alt="banderole" src="{album.banderole ?? "/defaultBanniere.png" }" />
    <form method="POST" action="?/update"
        class:center="{!enModification}"
    >
        <div class="head">
            <a class="retour" data-sveltekit-reload href="/portfolio"><img src="/retour.png" alt="icone de Sebastian Belalcazar"/></a>
            {#if enModification}
                <div class="input">
                    <input type="text" name="nom" value={album.nom.replace(/_/," ")}>
                </div>
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
                <div class="input textarea">
                    <textarea name="description">{album.description ?? ''}</textarea>
                </div>
                <div class="input">
                    <input type="checkbox" name="formatVignette" checked={album.formatVignette}>
                    <label for="checkbox">Format grand</label>
                </div>
                <div class="input">
                    <label for="vignette">Vignette</label>
                    <input type="file" name="vignette" accept=".jpg, .jpeg, .png" on:change={(e)=>onVignetteSelected(e)}/>
                    <input type="hidden" name="vignetteFile" value="{vignette}"/>
                </div>
                <div class="input">
                    <label for="banderole">Banderole</label>
                    <input type="file" name="banderole" accept=".jpg, .jpeg, .png" on:change={(e)=>onBanderoleSelected(e)}/>
                    <input type="hidden" name="banderoleFile" value="{banderole}"/>
                </div>
                <div class="input">
                    <label for="banderole">Ajouter des photographies</label>
                    <input type="file" name="photographies" accept=".jpg, .jpeg, .png" on:change={(e)=>onPhotographiesSelected(e)} multiple /> 
                    <input type="hidden" id="photographiesFiles" name="photographiesFiles" value="{JSON.stringify(photographies)}" />
                </div>
                <input type="submit" value="Modifier"/>
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
        gap: 10px
    }
    .head { 
        display: flex; 
        align-items: center;
    }
    .head > * { margin: 1em 0.3em;}
    p { 
        max-width: 1200px;
        margin: 0 2em;
        text-align: center;
    }
    .textarea {
        max-width: 1200px;
        width: 100%;
    }
    textarea {     
        height: 100px;
        width: 100%;
    }
    .input {    
        flex-direction: initial;
        align-items: baseline;
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
        width: 350px;
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
</style>