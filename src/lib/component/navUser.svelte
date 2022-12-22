<script>
    let menuUser = false
</script>

<div class="menu-deroulant"
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