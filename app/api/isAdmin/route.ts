import { isAdminByEmail } from "@/lib/mongoose/functions";
import { NextApiRequest } from "next";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){
  
  const {email} = await req.json();
  if(!email) return NextResponse.json({isAdmin:false}) 
  return NextResponse.json({isAdmin:(await isAdminByEmail(email))})
}