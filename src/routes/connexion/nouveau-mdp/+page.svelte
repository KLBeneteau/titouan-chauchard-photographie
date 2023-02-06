<script lang='ts'>
    import type { ActionData } from './$types';
    export let form: ActionData;
</script>

<svelte:head>
  <title>Récupération de mot de passe</title>
</svelte:head>

<a class="retour" data-sveltekit-reload href="/connexion"><img src="/retour.png" alt="icone de Sebastian Belalcazar"/></a>
<form method="POST">
    <h1>Mot de passe oublié</h1>
    <div class="flux">
        <div class="input">
            <label for="email">Mail</label>
            <input type="email" name="email" required value={form?.email ?? ''} class:input-error="{form?.error.email}">
            {#if form?.error.email}<p class="error">Utilisateur incconu</p>{/if}
        </div>
    </div>
    <input type="submit" value="Recevoir un mail de récupération"/>
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
    .retour {
        height: 50px;
        position: absolute;
        left: 15px;
        margin: 0;
    }
    .retour img {
        height: 50px;
    }

    /*mobile*/
    @media (max-width: 1100px) {
        form {
            margin-bottom: 2em;
            width: 80%;
        }

        h1 {
            max-width: 65%;
            text-align: center;
        }
    }
</style>