import mongoose from "mongoose";
import CommandeModel from "./Commande";

const UserSchema = new mongoose.Schema({
  nom: { 
    type: String,
    required: true,
    validate: {
      validator: function(v:string) {
        return /^[A-ZÀ-ÿa-z. '-,]+$/.test(v);
      },
      message: (props:any) => `${props.value} n'est pas un nom valide!`
    }
  },
  prenom: { 
    type: String,
    required: true,
    validate: {
      validator: function(v:string) {
        return /^[A-ZÀ-ÿa-z. '-,]+$/.test(v);
      },
      message: (props:any) => `${props.value} n'est pas un prenom valide!`
    } 
  },
  email: { 
    type: String,
    required: true,
    validate: {
      validator: function(v:string) {
        return /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/.test(v);
      },
      message: (props:any) => `${props.value} n'est pas un email valide!`
    }
  },
  telephone : { 
    type: String,
    required: true,
    validate: {
      validator: function(v:string) {
        return /^(0|\\+33|0033)[1-9][0-9]{8}$/.test(v);
      },
      message: (props:any) => `${props.value} n'est pas un telephone valide!`
    }
   },
  password: { type: String,required: true },
  role : { 
    type: String,
    enum : [ "utilisateur" , "admin" ],
    default: 'utilisateur'
  },
  historiques : [
    { type: mongoose.Types.ObjectId, ref: 'commandes', validate: {
      validator: async function(v:string) {
        try {
          let commande = await CommandeModel.findById(v)
          return commande?.statut === "en cours" || commande?.statut === "terminer"
        }
        catch(error){ return false }
      },
      message: () => `La commande n'a pas le bon statut !`
    } 
  }],
  pannier : { type: mongoose.Types.ObjectId, ref: 'commandes', validate: {
    validator: async function(v:string) {
      try {
        let commande = await CommandeModel.findById(v)
        return commande?.statut === "en pannier"
      }
      catch(error){ return false }
    },
    message: () => `La commande n'a pas le bon statut !`
  }},
  token : { type: String }
});

const COLLECTION_NAME = "users";
const UserModel = mongoose.model("Users", UserSchema, COLLECTION_NAME);

export default UserModel;