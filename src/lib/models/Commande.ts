import mongoose from "mongoose";

const CommandeSchema = new mongoose.Schema({
    utilisateur : { type: mongoose.Types.ObjectId, ref: 'users' },
    statut : { 
        type: String,
        enum : [ "en pannier" , "en cours" , "terminer"],
        default: 'en pannier'
    },
    contenu :  [{
       produit : { type: mongoose.Types.ObjectId, ref: 'produits', required: true },
       quantite : { type : Number , required: true, validate: { 
            validator : (v:number) => {return v>0},
            message : (props:any) => `${props.value} : la quantité doit etre au dessu de 0 !`
        }},
       dimension : { type : String , required: true},
       prix : { type : Number, required: true, validate: { 
            validator : (v:number) => {return v>0},
            message : () => `Le prix doit être superieure a 0 !`
        }},
        nom : { type : String , required: true}
    }],
    dernierModif : { type : Date, default:Date.now()},
    infoLivraison : {
        nom : { type : String, validate: {
            validator: function(v:string) {
              return /^[A-ZÀ-ÿa-z. '-,]+$/.test(v);
            },
            message: (props:any) => `${props.value} n'est pas un nom valide!`
          }},
        prenom : { type : String, validate: {
            validator: function(v:string) {
              return /^[A-ZÀ-ÿa-z. '-,]+$/.test(v);
            },
            message: (props:any) => `${props.value} n'est pas un prenom valide!`
          } },
        adresse : {
            rue : { type : String},
            complement : { type : String},
            cp : { type : String, validate: {
                validator: function(v:string) {
                  return /^(?:0[1-9]|[1-8]\d|9[0-8])\d{3}$/.test(v);
                },
                message: (props:any) => `${props.value} n'est pas un code postal valide!`
              }},
            ville : { type : String},
            pays : { type : String},
        },
        telephone : { type : String, validate: {
            validator: function(v:string) {
              return /^(0|\\+33|0033)[1-9][0-9]{8}$/.test(v);
            },
            message: (props:any) => `${props.value} n'est pas un telephone valide!`
          }},
        email : { type : String, validate: {
            validator: function(v:string) {
              return /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/.test(v);
            },
            message: (props:any) => `${props.value} n'est pas un email valide!`
          }},
    }
})

const COLLECTION_NAME = "commandes";
const CommandeModel = mongoose.model("Commandes", CommandeSchema, COLLECTION_NAME);

export default CommandeModel;