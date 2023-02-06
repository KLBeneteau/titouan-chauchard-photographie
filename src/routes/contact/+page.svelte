<script lang='ts'>
    import FullHeader from '$lib/component/fullHeader.svelte';
    import NavUser from "$lib/component/navUser.svelte";
    import { page } from '$app/stores';

    import type { PageParentData } from './$types';
    export let data: PageParentData;

    const session = $page.data.session;
    let user = session?.user

    import type { ActionData } from './$types';
    export let form: ActionData;
</script>

<svelte:head>
  <meta property="description" content="Pour toute demande, contactez-moi directement via mon site, ou au 07.82.70.82.35" />
  <title>Titouan Chauchard - Contact</title>
</svelte:head>

{#if user}
    <FullHeader menuDeroulant={data.menuDeroulant}>
        <NavUser slot="nav-user"/>
    </FullHeader>  
{:else} 
    <FullHeader menuDeroulant={data.menuDeroulant}>
        <a data-sveltekit-reload  slot="nav-user" href="/connexion">
            <div class="bureau">Se connecter </div>
            <img class="mobile" alt="logo connexion" src="/enter.png" />
        </a>
    </FullHeader> 
{/if}

<img class="banderole" alt="banderole" src="/banniereContact.png" />
<main>
    <div class="information">
        <h2 class="selfCenter">Contact</h2>
        <p class="selfCenter">Mon travail vous plaît, vous souhaitez réserver une séance, une collaboration peut-être, ou tout simplement une question ? Contactez-moi via le formulaire ci-joint. Ou retrouvez-moi sur mes différents réseaux sociaux :</p>
        <p>Téléphone : 07.82.70.82.35</p>
        <p>Localisation : Les Sables d'Olonne (85) <br/> <span>Déplacements possibles dans toute la France</span></p>
        <p>Facebook : Titouan Chd</p>
        <p>Instagram : titouan_chd</p>
        <div class="reseaux">
            <a href="https://www.instagram.com/titouan_chd" target="_blank" rel="noreferrer">
                <img alt="logo insta" src="/insta.png" />
            </a>
            <a href="https://www.facebook.com/profile.php?id=100004453997153" target="_blank" rel="noreferrer">
                <img alt="logo facebook" src="/facebook.png" />
            </a>
        </div>
    </div>
    <form method="POST">
        <h2>Envoyer une demande</h2>
        <div class="flux">
            <div class="ligne">
                <div class="input">
                    <label for="nom">Nom</label>
                    <input type="text" name="nom" required value={form?.nom ?? user?.nom ?? ''} class:input-error="{form?.error.nom}">
                    {#if form?.error.nom}<p class="error">Nom invalide</p>{/if}
                </div>
                <div class="input">
                    <label for="prenom">Prénom</label>
                    <input type="text" name="prenom" required value={form?.prenom ?? user?.prenom ?? ''} class:input-error="{form?.error.prenom}">
                    {#if form?.error.prenom}<p class="error">Prénom invalide</p>{/if}
                </div>
            </div>
            <div class="ligne">
                <div class="input">
                    <label for="telephone">Téléphone</label>
                    <input type="tel" name="telephone" required value={form?.telephone ?? user?.telephone ?? ''} class:input-error="{form?.error.telephone}"> 
                    {#if form?.error.telephone}<p class="error">Téléphone invalide</p>{/if}
                </div>
                <div class="input">
                    <label for="email">Mail</label>
                    <input type="email" name="email" required value={form?.email ?? user?.email ?? ''} class:input-error="{form?.error.email}">
                    {#if form?.error.email}<p class="error">Mail invalide</p>{/if}
                </div>
            </div>
            <div class="input">
                <label for="objet">Objet</label>
                <input type="text" name="objet" value={form?.objet ?? ''} placeholder="Collaboration, mariage, naissance..." required >
            </div>
            <div class="input">
                <label for="message">Message</label>
                <textarea name="message" required >{form?.message ?? ''}</textarea>
            </div>
        </div>
        <input type="submit" value="Envoyer" class="submit"/>
    </form>
</main>

<style>
    main { 
        display: flex;
        justify-content: space-between;
        width: 90%;
        margin: 1em auto;
    }
    main > * {
        display: flex;
        flex-direction: column;
    }
    .selfCenter { align-self: center; text-align: center;}
    p:not(p:first-of-type) { margin: 0.5em 0;}
    span { font-size: small;}
    .reseaux { margin: 2em 0;}
    .reseaux img {
        height: 60px;
    }
    form {
        display: flex;
        flex-direction: column;
        max-width: 500px;
        margin: 0 auto;
        align-items: center;
        gap: 30px;
    }
    .flux {
        width: 100%;
        gap: 15px;
        display: flex;
        flex-direction: column;
    }
    .ligne {
        display: flex;
        gap:20px;
    }
    .input { 
        width: 100%;
    }
    input:not(.noColor), textarea {
        background-color: var(--TC-clair);
    }
    textarea { height: 250px;}

    .submit {
        padding: 0.8em 2em;
        color: var(--TC-noir);
    }

    /*bureau*/
    @media (min-width: 1100px) {
        main > * {
                    width: 48%;
        }
    }
    /*mobile*/
    @media (max-width: 1100px) {
        main,.ligne {
            flex-direction: column;
        }
    }
</style>