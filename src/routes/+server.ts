import mongoose from "mongoose";
import dotenv from "dotenv";

import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
    console.log("début connexion mongoDb")
    dotenv.config();
    const {MONGO_PORT, MONGO_DB, MONGO_HOST} = process.env;
    
    await mongoose.set('strictQuery', false);
    await mongoose.connect(`mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB}`)
    await mongoose.set('strictQuery', false);

    console.log("Connexion a mongoDb réussie")

    return new Response("Connexion a mongoDB réussie")
}

