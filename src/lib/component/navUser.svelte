<script>
    import { menuUserMobile } from "./store";
    let menuUser = false ;
</script>

<div class="menu-deroulant bureau"
    on:mouseenter={() => menuUser=true}
    on:mouseleave={() => menuUser=false}
>
    <a data-sveltekit-reload  href="/mon-compte">Mon Compte</a>
    {#if menuUser}
        <div class="menu">
            <a data-sveltekit-reload href="/pannier">Mon Pannier</a>
            <form method="POST" action="/?/logout">
                <input type="submit" value="Se déconnecter"/>
            </form>
        </div>
    {/if}
</div>
<button class="mobile"
    on:click={() => { menuUserMobile.update(val => !val)}}
>
    <img class="logoMobile" src="/userLogo.png" alt="Bouton pour afficher le menu de l'utilisateur"/>
</button>