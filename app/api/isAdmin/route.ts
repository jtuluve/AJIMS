import { isAdmin } from "@/lib/mongoose/functions";
import { NextRequest, NextResponse } from "next/server";

export async function GET({req,res}:{req:NextRequest,res:NextResponse}){
  return NextResponse.json({isAdmin:(await isAdmin())})
}