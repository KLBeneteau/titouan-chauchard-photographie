<script lang="ts">
   import { menuUserMobile, menuBurgerMobile } from "./store";


   let menuUserMobileValue : boolean ;
   menuUserMobile.subscribe(value => {
        menuUserMobileValue = value;
    });

    let menuBurgerMobileValue : boolean ;
    menuBurgerMobile.subscribe(value => {
        menuBurgerMobileValue = value;
    });

</script>

<header>
    <nav>   
        <slot name="nav-mobile"><div class="mobile"></div></slot>
        <slot name="nav-1"><div class="bureau"></div></slot>
        <slot name="nav-2"><div class="bureau"></div></slot>
        <slot name="nav-3"><div class="bureau"></div></slot>
    </nav>
    <a data-sveltekit-reload href="/" class="a-logoSite">
        <img class="logoSite" alt="Logo du site" src="/logo-titouan-chauchard.png" />
    </a>
    <nav>
        <slot name="nav-4"><div class="bureau"></div></slot>
        <slot name="nav-5"><div class="bureau"></div></slot>
        <slot name="nav-user"><div></div></slot>
    </nav>
</header>
<div class="menuMobile mobile" class:open="{menuUserMobileValue}">
    <button class="close" on:click={() => { menuUserMobile.set(false)}}>
        <img src="/close.png" alt="Bouton pour fermer le menue de l'utilisateur"/>
    </button>
    <a data-sveltekit-reload  href="/mon-compte">Mon Compte</a>
    <a data-sveltekit-reload href="/pannier">Mon Pannier</a>
    <form method="POST" action="/?/logout">
        <input type="submit" value="Se déconnecter"/>
    </form>
</div>

<div class="menuMobile mobile" class:open="{menuBurgerMobileValue}">
    <button class="close" on:click={() => { menuBurgerMobile.set(false)}}>
        <img src="/close.png" alt="Bouton pour fermer le menue burger"/>
    </button>
    <a data-sveltekit-reload  href="/presentation">Présentation</a>
    <a data-sveltekit-reload  href="/portfolio">Portfolio</a>
    <a data-sveltekit-reload  href="/tirages" >Tirages d'Art</a>
    <a data-sveltekit-reload  href="/voyages" >Voyages</a>
    <a data-sveltekit-reload  href="/contact" >Contact</a>
</div>

<style>
    header {
        display: flex;
        padding: 0 5%;
        align-items: center;
    }
    nav {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        width: 100%;
    }
    div { width: 100%;}
    :global(header nav a, header nav button,header nav form){
        white-space: nowrap;
        text-align: center;
    }
    :global(.menu-deroulant) { 
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    :global(.menu-deroulant > a ) { position: relative; }
    :global(.menu) {
        position: absolute;
        color:black;
        top: 130px;
        display: flex;
        flex-direction: column;
    }
    :global(.menu > *) {
        padding: 0.5em 2.5em;
        background-color: var(--TC-beige);
        margin-left: -3em;
    }
    :global(.menu > *:not(.menu > *:last-child)) {
        border-bottom: 1px solid #B0AAAA;
    }
    :global(.menu > * > * ){
        margin: 0 !important; 
        padding: 0 !important;
    }

    /*mobile*/
    @media (max-width: 1100px) {
        img.logoSite { 
            max-height: 130px;
            max-width: 45vw;
        }
        header {
            border-bottom: 1px solid var(--TC-clair);
            height: 140px;
            position: relative;
            z-index: 10;
            background-color: #252525;
        }
        .menuMobile {
            position: absolute;
            width: 100vw;
            height: calc( 100vh - 140px );
            left:0;
            top: calc( -100vh + 280px );
            background-color: var(--TC-beige);
            color: var(--TC-noir);
            display: flex;
            flex-direction: column;
            transition: 1s;
            z-index: 5;
            align-items: center;
        }
        .menuMobile > a, .menuMobile > form {
            width: 80%;
            max-width: 240px;  
            text-align: center;
        }
        .menuMobile > a:not(.menuMobile > a:last-child), .menuMobile > form:not(.menuMobile > form:last-child) {
            border-bottom: 1px solid #B0AAAA;
        }
        .menuMobile.open {
            top : 140px ;
        }
        .close { align-self: flex-end; }

        nav {
            justify-content: center;
            min-width: 10%;
        }

        :global(.logoMobile) {
            min-width: 30%;
        }

        .a-logoSite {
            display: flex;
            align-items: center;
            height: 100%;
            padding: 0 1em;
            margin-top: 0.2em;
            margin: 0 1em;
        }
    }
    /*bureau*/
    @media (min-width: 1100px) {
        header {
            height: 220px;
        }

        :global(header nav a, header nav button,header nav form){
            width: 100%;
        }

        nav {
            justify-content: flex-end;
        }
    }
</style>