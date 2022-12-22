<header>
    <nav>   
        <slot name="nav-1"><div></div></slot>
        <slot name="nav-2"><div></div></slot>
        <slot name="nav-3"><div></div></slot>
    </nav>
    <a data-sveltekit-reload href="/">
        <img alt="Logo du site" src="/logo-titouan-chauchard.png" />
    </a>
    <nav>
        <slot name="nav-4"><div></div></slot>
        <slot name="nav-5"><div></div></slot>
        <slot name="nav-user"><div></div></slot>
    </nav>
</header>

<style>
    header {
        display: flex;
        height: 220px;
        margin: 0 5%;
        margin-bottom: 2em;
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
        width: 100%;
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
</style>