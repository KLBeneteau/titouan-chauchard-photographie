<script lang="ts">
    import ResumeTT from '$lib/component/resumeTT.svelte';

    import type { ActionData } from './$types';
    export let form: ActionData;

    import type { PageParentData } from './$types';
    export let data: PageParentData;

</script>

<svelte:head>
  <title>Informations de livraison</title>
</svelte:head>

<main>
    <a class="retour" data-sveltekit-reload href="/pannier"><img src="/retour.png" alt="icone de Sebastian Belalcazar"/></a>
    <h1>Adresse de livraison</h1>
    <div class="flux">
        <form method="POST">
            <div class="ligne">
                <div class="input">
                    <label for="nom">Nom</label>
                    <input type="text" name="nom" required value={form?.nom ?? data.pannier.infoLivraison?.nom ?? data.session.user.nom ?? ''} class:input-error="{form?.error.nom}">
                    {#if form?.error.nom}<p class="error">Nom invalide</p>{/if}
                </div>
                <div class="input">
                    <label for="prenom">Prénom</label>
                    <input type="text" name="prenom" required value={form?.prenom ?? data.pannier.infoLivraison?.prenom ?? data.session.user.prenom ?? ''} class:input-error="{form?.error.prenom}">
                    {#if form?.error.prenom}<p class="error">Prénom invalide</p>{/if}
                </div>
            </div>
            <div class="input">
                <label for="rue">Nom et numéro de rue</label>
                <input type="text" name="rue" required value={form?.rue ?? data.pannier.infoLivraison?.adresse.rue ?? ''} placeholder="12 rue de mon beau tirage">
            </div>
            <div class="input">
                <label for="complement">Complément d'adresse</label>
                <input type="text" name="complement" value={form?.complement ?? data.pannier.infoLivraison?.adresse.complement ?? ''}>
            </div>
            <div class="ligne">
                <div class="input">
                    <label for="cp">Code postal</label>
                    <input type="text" name="cp" required value={form?.cp ?? data.pannier.infoLivraison?.adresse.cp ??''} class:input-error="{form?.error.cp}">
                    {#if form?.cp.nom}<p class="error">Code postal invalide</p>{/if}
                </div>
                <div class="input">
                    <label for="ville">Ville</label>
                    <input type="text" name="ville" required value={form?.ville ?? data.pannier.infoLivraison?.adresse.ville ?? ''} class:input-error="{form?.error.ville}">
                    {#if form?.error.ville}<p class="error">Ville invalide</p>{/if}
                </div>
            </div>
            <div class="input pays">
                <label for="pays">Pays</label>
                <input type="text" name="pays" required value={form?.pays ?? data.pannier.infoLivraison?.adresse.pays ?? ''} class:input-error="{form?.error.pays}">
                {#if form?.error.pays}<p class="error">Nous ne livrons pas dans ce pays</p>{/if}
            </div>
            <div class="input">
                <label for="telephone">Téléphone</label>
                <input type="tel" name="telephone" required value={form?.telephone ?? data.pannier.infoLivraison?.telephone ?? data.session.user.telephone ?? ''} class:input-error="{form?.error.telephone}"> 
                {#if form?.error.telephone}<p class="error">Téléphone invalide</p>{/if}
            </div>
            <div class="input">
                <label for="email">Mail</label>
                <input type="email" name="email" required value={form?.email ?? data.pannier.infoLivraison?.email ?? data.session.user.email ?? ''} class:input-error="{form?.error.email}">
                {#if form?.error.email}<p class="error">Mail invalide</p>{/if}
            </div>
            <input type="submit" value="Continuer"/>
        </form>
        <ResumeTT pannier={data.pannier}></ResumeTT>
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
        margin-bottom: 4em;
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
    .flux {
        display: flex;
        justify-content: space-around;
        width: 100%;
        align-items: flex-start;
        margin-top: 3em;
    }

    form {
        display: flex;
        flex-direction: column;
        max-width: 500px;
        align-items: center;
        gap: 30px;
    }

    .pays { 
        width: calc(50% - 10px) !important;
        align-self: flex-start;
    }

    .ligne {
        display: flex;
        gap:20px;
    }

    .input { 
        width: 100%;
    }
    input {
        background-color: var(--TC-clair);
    }

    input[type="submit"] {
        padding: 0.8em 2em;
        color: var(--TC-noir);
        margin-top: 1em;
    }
</style>
