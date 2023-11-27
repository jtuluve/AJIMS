"use server"
import mongoose from "mongoose"
import { getServerSession } from "next-auth";
import User from "./model"
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
var isConnected = false;
export async function connectToDB() {
    if(!process.env.MONGODB_URI) return console.log("MONGODB URL is not set");
    if(isConnected) return console.log("Already connected to DB");
    try{
        await mongoose.connect(process.env.MONGODB_URI)
        isConnected=true;
        console.log("Connected to DB");
    }catch{
        console.log("Error occured")
    }
}

interface Profile{
    name?:string,
    designation?:string,
    department?:string
}

export async function updateProfile(formdata:FormData) {
    const profile:Profile = {
        name: formdata.get("name") as string,
        designation: formdata.get("designation") as string,
        department: formdata.get("department") as string
    };
    try{
        connectToDB();
        if(!profile.name&&!profile.designation&&!profile.department) return console.log("No data found!")
        const serverSession = await getServerSession() as any; 
        const uid = await getUidFromEmail(serverSession.user.email);
        await User.findOneAndUpdate({uid},profile,{new:true})
        await User.syncIndexes()
    }catch(err){
        console.log(err)
    }
}

export async function getUidFromEmail(email){
    try{
        const user = await User.findOne({email})
        return user.uid;
    }catch{
        return null;
    }
    
}
export async function getUid(){
    try{
        const {email} = (await getServerSession()).user;
        const user = await User.findOne({email})
        return user.uid;
    }catch{
        return null;
    }
}

export async function createUserIfNotExists({email,uid}){
    try{
        const user = await User.findOne({email,uid})
        if(!user){
            User.create({uid,email})
                .then(()=>console.log("User created"))
                .catch(err=>{throw err})
        }

    }catch{
        console.log("Error occured while creating user")
    }
}
