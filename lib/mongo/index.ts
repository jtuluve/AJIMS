import { MongoClient, ServerApiVersion } from "mongodb"
// import User from "@/lib/mongo/model"
import mongoose from "mongoose";
// Replace the placeholder with your Atlas connection string

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(process.env.MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
}
);
//FIXME: Trial user type for profile to verify usecase. Fixit to make it more advanced later.
type User={
  name?: string;
  designation?:string;
  department?:string;
}
  mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log("Mongoose connected"))
    .catch(() => console.log("Mongoose connection error"))
  // Connect the client to the server (optional starting in v4.7)
  client.connect()
    .then(() => console.log("Mongoose connected"))
    .catch(() => console.log("Mongoose connection error"))

  // // Send a ping to confirm a successful connection
  // await client.db("admin").command({ ping: 1 });
  // console.log("Pinged your deployment. You successfully connected to MongoDB!");
  // User.create()

