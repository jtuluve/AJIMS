"use server"
import { MongoClient, ServerApiVersion } from "mongodb"
import User from "@/lib/mongoose/model"
import mongoose from "mongoose";
const mongodbConnect = ()=>{
    mongoose.connect(process.env.MONGODB_URI)
}
/* const updateProfile = async (formdata: any) => {
    try {
        const client = new MongoClient(process.env.MONGODB_URI, {
            serverApi: {
                version: ServerApiVersion.v1,
                strict: true,
                deprecationErrors: true,
            }
        }
        );
        //FIXME: Trial user type for profile to verify usecase. Fixit to make it more advanced later.
        type User = {
            name?: string;
            designation?: string;
            department?: string;
        }
        let user:User = {
            name:formdata.get("name"),
            designation:formdata.get("designation"),
            department:formdata.get("department")
        };
        await mongoose.connect(process.env.MONGODB_URI)
        //     .then(() => console.log("Mongoose connected"))
        //     .catch(() => console.log("Mongoose connection error"))
        // Connect the client to the server (optional starting in v4.7)
        await client.connect()
        const db = client.db("ajims")
        const collection = db.collection("users")
        await collection.insertOne(user)
        console.log(user)
        // // Send a ping to confirm a successful connection
        // await client.db("admin").command({ ping: 1 });
        // console.log("Pinged your deployment. You successfully connected to MongoDB!");
        // User.create()
        client.close()
        console.log("Success")
    } catch (e) {
        console.error(e)
    }

} */

//FIXME:trying above function mongoose, fix any one later
const updateProfile = async (formdata: any) => {
    User.insertMany([{
        uid:"1000"
    }])
    try {

    }catch{

    }
}
export default updateProfile;