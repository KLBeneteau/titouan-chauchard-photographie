<script lang='ts'>
    import type { ActionData } from './$types';
    export let form: ActionData;
</script>

<svelte:head>
  <meta property="description" content="Connectez-vous afin de profiter de tout mon contenu" />
  <title>Titouan Chauchard - Connexion</title>
</svelte:head>

<form method="POST">
    <h1>Connexion</h1>
    <div class="flux">
        <div class="input">
            <label for="email">Mail</label>
            <input type="email" name="email" required value={form?.email ?? ''} class:input-error="{form?.error.email}">
            {#if form?.error.email}<p class="error">Utilisateur incconu</p>{/if}
        </div>
        <div class="input">
            <label for="password">Mot de passe</label>
            <input type="password" name="password" required class:input-error="{form?.error.password}" >
            {#if form?.error.password}<p class="error">Mot de passe incorect</p>{/if}
        </div>
        <a href="/connexion/nouveau-mdp">Mot de passe oublié</a>
    </div>
    <input type="submit" value="Se connecter"/>
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

    /*mobile*/
    @media (max-width: 1100px) {
        form {
            margin-bottom: 2em;
            width: 80%;
        }
    }
</style>