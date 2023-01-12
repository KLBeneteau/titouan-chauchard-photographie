<script lang="ts">
    import { page } from '$app/stores';

    const session = $page.data.session;
    let f = session?.flash

    let modal = f?.type == "success"
</script>

{#if f }
 {#if f.type == "success"}
    {#if modal}
        <div class="fondModale" on:click={()=>modal=false} on:keypress role="alert">
            <p>
                {f.message}
                <img alt="success" src="/success.png"/>
            </p>
        </div>
    {/if}
 {:else}
    <p class="flash {f.type}" role="alert">{f.message}</p>
 {/if}
{/if}
<slot/>

<style>
    @import url('https://fonts.googleapis.com/css?family=Playfair+Display&display=swap');
    :global(body) { 
        margin: 0; 
        background-color: var(--TC-sombre);
        font-family: 'Playfair Display';
        color: var(--TC-clair);
    }
    :global(button,a,input[type="submit"]) {
        background: none;
        border: none;
        height: fit-content;      
        padding: 0.8em 1em;
        text-decoration: none;
        font-family: 'Playfair Display';
        font-size: inherit;
        cursor: pointer;
        color: inherit;
        margin: 0;
    }
    :global(.modale) {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);

        display: flex;
        flex-direction: column;
        align-items: center;

        padding: 1em 6em;
        background-color: var(--TC-clair); 
        color: var(--TC-noir);
    }
    :global(.input){
        display: flex;
        flex-direction: column;
        position: relative;
    }
    :global(.input input){
        padding: 0.5em 1em;
        border: none;
        margin: 5px 0;
    }
    :global(.error) { 
        color : #F41616;
        margin: 0;
    } 
    :global(.success) { 
        color : green;
        margin: 0;
    } 
    :global(.input .error) { 
        font-size: smaller;
        align-self: flex-end;
        position: absolute;
        bottom: -15px;
    }
    :global(.input-error){
        border: 1px solid #F41616 !important;
    }
    :global(.banderole){  
        height: 130px ;
        width: 100%;
        object-fit: cover;
    }
   
    .flash {
        margin: 0 50%;
        white-space: nowrap;
        transform: translate(-50%, -50%);   
        position: absolute;
        top: 220px;
    }
    .fondModale { 
        position: absolute;
        height: 100vh;
        width: 100vw;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: var(--TC-sombre);
        z-index: 1;
    }
    .fondModale > p {
        padding: 2em 4em;
        background-color: var(--TC-clair);
        color: var(--TC-noir);
        align-items: center;
        display: flex;
        justify-content: center;
        flex-direction: column;
        gap: 20px;
        font-size: x-large;
        font-weight: 900;
    }
    .fondModale img {
        height: 50px;
    }
</style>
