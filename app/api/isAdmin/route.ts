import { isAdmin } from "@/lib/mongoose/functions";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  return NextResponse.json({ isAdmin: (await isAdmin()) })
}