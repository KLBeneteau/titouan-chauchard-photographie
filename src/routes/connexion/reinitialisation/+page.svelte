<script lang='ts'>
    import type { ActionData } from './$types';
    export let form: ActionData;
</script>

<svelte:head>
  <title>Réinitialisation du mot de passe</title>
</svelte:head>

<form method="POST">
    <h1>Réinitialisez votre mot de passe</h1>
    <div class="flux">
        <div class="input">
            <label for="password">Mot de passe</label>
            <input type="password" name="password" required class:input-error="{form?.error.password}" >
            {#if form?.error.password}<p class="error err-password">Votre mot de passe doit au moins contenir : une majuscule, une minuscule, un chiffre, un caractère spécial, et faire plus de 8 caractères</p>{/if}
        </div>
        <div class="input">
            <label for="confirm-password">Confirmation mot de passe</label>
            <input type="password" name="confirm-password" required class:input-error="{form?.error['confirm-password']}">
            {#if form?.error['confirm-password']}<p class="error">Mot de passe et confirmation différents</p>{/if}
        </div>
    </div>
    <input type="submit" value="Modifier mon mot de passe"/>
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
    .err-password {
        bottom: -30px;
    }

    /*mobile*/
    @media (max-width: 1100px) {
        form {
            margin-bottom: 2em;
            width: 80%;
        }

        h1 {
            text-align: center;
        }
    }
</style>