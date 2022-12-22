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
            validator : (v:number) => {return v>=0},
            message : (props:any) => `${props.value} : la quantité ne peut etre négative !`
        }},
       dimension : { type : String , required: true},
       prix : { type : Number, required: true, validate: { 
            validator : (v:number) => {return v>0},
            message : () => `Le prix doit être superieure a 0 !`
        }}
    }],
    dernierModif : { type : Date, default:Date.now()}
})

const COLLECTION_NAME = "commandes";
const CommandeModel = mongoose.model("Commandes", CommandeSchema, COLLECTION_NAME);

export default CommandeModel;