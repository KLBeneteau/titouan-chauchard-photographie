import mongoose from "mongoose";

const ProduitSchema = new mongoose.Schema({
    nom: { type: String , required: true, unique: true},
    description : { type: String },
    tarif : [{ 
        dimension : { type : String, required: true },
        prix : { type : Number, required: true, validate: { 
            validator : (v:number) => {return v>0},
            message : () => `Le prix doit être superieure a 0 !`
        }}
    }],
    image : { data : Buffer , contentType: String }
    //https://stackoverflow.com/questions/29780733/store-an-image-in-mongodb-using-node-js-express-and-mongoose
})

const COLLECTION_NAME = "produits";
const ProduitModel = mongoose.model("Produits", ProduitSchema, COLLECTION_NAME);

export default ProduitModel;