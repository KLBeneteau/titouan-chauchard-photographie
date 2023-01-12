<svelte:head>
    <script type="text/javascript" src="https://js.stripe.com/v3/"></script>
</svelte:head>

<script lang="ts">
    import { onMount } from 'svelte';
    import ResumeTT from '$lib/component/resumeTT.svelte';

    import type { PageServerData } from './$types';
    export let data: PageServerData;

    let stripe : any
    let elements : any
    let cardNumber : any
    let cardExpiry : any
    let cardCvc : any

    let name = '';
    let error : string | null = null

    onMount(async () => {

        stripe = Stripe(data.publicKey)
        elements = stripe.elements()
        cardNumber = elements.create('cardNumber')
        cardExpiry = elements.create('cardExpiry')
        cardCvc = elements.create('cardCvc')

        cardNumber.mount('#cardNumber')
        cardExpiry.mount('#cardExpiry')
        cardCvc.mount('#cardCvc')

	});

    async function handleSubmit(){
            document.querySelector('input[type="submit"]')?.setAttribute('disabled','true')         
            
            //Envoie du paiement a stripe
            const result = await stripe.confirmCardPayment(data.clientSecretKey,{
                payment_method: { 
                    card : cardNumber,
                    billing_details : {
                        email : data.pannier.infoLivraison.email,
                        name : name
                    }
                }
            })

            if(!result.error && result.paymentIntent.status === 'succeeded'){
                error = null 
                cardNumber.clear()
                cardExpiry.clear()
                cardCvc.clear()

                //envoie de du resultat au serveur
                const dataForm = new FormData();
                dataForm.set('status','success');
                
                const response = await fetch('?/try', {
                    method: 'POST',
                    body: dataForm
                });
                if(response.status === 200)
                    window.location.replace(window.location.origin);
        
            }
            else error = "Echec du paiement"
            document.querySelector('input[type="submit"]')?.removeAttribute('disabled')
        }

</script>

<main>
    <a class="retour" data-sveltekit-reload href="/pannier/commander"><img src="/retour.png" alt="icone de Sebastian Belalcazar"/></a>
    <div class="head">   
        <h1>Mode de paiement</h1>
        <img alt="visa" src="/visa.png"/>
    </div>
    <div class="flux">
        <form method="POST" on:submit|preventDefault={handleSubmit}>
            <div class="card-input">
                <label for="name">Prénom et nom du titulaire de la carte </label>
                <input id="cardName" type="name" name="rue" required bind:value={name}>
            </div>
            <div class="card-input">
                <label for="cardNumber">Numéro de la carte</label>
                <div id="cardNumber" class="card"></div>
            </div>
            <div class="card-input">
                <label for="cardExpiry">Date de fin de validité</label>
                <div id="cardExpiry" class="card"></div>
            </div>
            <div class="card-input">
                <label for="cardCvc">Cryptogramme visuel</label>
                <div id="cardCvc" class="card"></div>
            </div>
            <div class="btn-paiement">
                <input type="submit" value="Continuer"/>
                {#if error}
                    <p class="error">{error}</p>
                {/if}
            </div>
           

            
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
    }
    .head{ display: flex;align-items: center;}
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
    }

    form {
        display: flex;
        flex-direction: column;
        max-width: 500px;
        align-items: flex-start;
        gap: 30px;
        width: 100%;
        margin: 3em 0;
    }
    .card-input {
        display: flex;
        flex-direction: column;
        width: 100%;
        gap: 5px;
    }
    .card, input { 
        background-color: var(--TC-clair);
        padding: 0.4em 0.5em;
        border: none;
    }
    #cardExpiry, #cardCvc {width: 60%;}

    input[type="submit"] {
        padding: 0.8em 2em;
        color: var(--TC-noir);
        margin-top: 1em;
        background-color: var(--TC-clair);
    }
    input[type="submit"]:disabled {
        background-color: var(--TC-gris);
        cursor: none;
    }
    .btn-paiement{ 
        display: flex; 
        gap: 20px;
        align-items: baseline;
    }
</style>