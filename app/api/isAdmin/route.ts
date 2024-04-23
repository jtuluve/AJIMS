import { isAdmin } from "@/lib/mongoose/functions";
import { NextRequest, NextResponse } from "next/server";
//TODO: should delete this api, if not used
export async function GET(req: NextRequest) {
  return NextResponse.json({ isAdmin: (await isAdmin()) })
}