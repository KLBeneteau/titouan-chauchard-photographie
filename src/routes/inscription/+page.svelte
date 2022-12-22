<script lang='ts'>
    import type { ActionData } from './$types';
    import FullHeader from '$lib/component/fullHeader.svelte';

    import type { PageParentData } from './$types';
    export let data: PageParentData;

    export let form: ActionData;
</script>

<FullHeader menuDeroulant={data.menuDeroulant}>
    <a data-sveltekit-reload slot="nav-user" href="/connexion">Se connecter</a>
</FullHeader>
<form method="POST">
    <h1>Inscription</h1>
    <div class="flux">
        <div class="ligne">
            <div class="input">
                <label for="nom">Nom</label>
                <input type="text" name="nom" required value={form?.nom ?? ''} class:input-error="{form?.error.nom}">
                {#if form?.error.nom}<p class="error">Nom invalide</p>{/if}
            </div>
            <div class="input">
                <label for="prenom">Prénom</label>
                <input type="text" name="prenom" required value={form?.prenom ?? ''} class:input-error="{form?.error.prenom}">
                {#if form?.error.prenom}<p class="error">Prénom invalide</p>{/if}
            </div>
        </div>
        <div class="ligne">
            <div class="input">
                <label for="telephone">Téléphone</label>
                <input type="tel" name="telephone" required value={form?.telephone ?? ''} class:input-error="{form?.error.telephone}"> 
                {#if form?.error.telephone}<p class="error">Téléphone invalide</p>{/if}
            </div>
            <div class="input">
                <label for="email">Mail</label>
                <input type="email" name="email" required value={form?.email ?? ''} class:input-error="{form?.error.email}">
                {#if form?.error.email}<p class="error">Mail invalide</p>{/if}
            </div>
        </div>
        <div class="input">
            <label for="password">Mot de passe</label>
            <input type="password" name="password" required class:input-error="{form?.error.password}" >
            {#if form?.error.password}<p class="error err-password">Votre mot de passe doit au moins contenir : une majuscule, une minuscule, un chiffre, un caractère spécial, et faire plus de 8 caractère</p>{/if}
        </div>
        <div class="input">
            <label for="confirm-password">Confirmation mot de passe</label>
            <input type="password" name="confirm-password" required class:input-error="{form?.error['confirm-password']}">
            {#if form?.error['confirm-password']}<p class="error">Mot de passe et confirmation différentes</p>{/if}
        </div>
        {#if form?.error.userExiste}<p class="error">Cet email est déja utilisé !</p>{/if}
    </div>
    <input type="submit" value="S'inscrire"/>
</form>

<style>
    form {
        display: flex;
        flex-direction: column;
        max-width: 500px;
        margin: auto;
        align-items: center;
        gap: 30px;
    }

    .flux {
        width: 100%;
        gap: 30px;
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
    input {
        background-color: var(--TC-clair);
    }

    input[type="submit"] {
        padding: 0.8em 2em;
        color: var(--TC-noir);
        margin-top: 1em;
    }

    .err-password {
        bottom: -30px;
    }
</style>