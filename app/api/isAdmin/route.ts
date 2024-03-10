import { isAdmin } from "@/lib/mongoose/functions";
import { NextResponse } from "next/server";

export async function GET({req,res}){
  return NextResponse.json({isAdmin:(await isAdmin())})
}