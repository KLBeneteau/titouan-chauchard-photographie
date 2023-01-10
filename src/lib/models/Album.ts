import mongoose from "mongoose";

const AlbumSchema = new mongoose.Schema({
    nom: {  type: String , required: true, unique: true},
    description : {  type: String },
    vignette : {  type: String },
    formatVignette : { type : Boolean, default : false },
    banderole : {  type: String },
    images : [ String ]
    //https://stackoverflow.com/questions/29780733/store-an-image-in-mongodb-using-node-js-express-and-mongoose
})

const COLLECTION_NAME = "albums";
const AlbumModel = mongoose.model("Albums", AlbumSchema, COLLECTION_NAME);

export default AlbumModel;