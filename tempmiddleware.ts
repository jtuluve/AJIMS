import { withAuth } from "next-auth/middleware"
import { getUidFromEmail, isAdmin } from "./lib/mongoose/functions";
import { NextResponse } from "next/server";

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  async function middleware(req) {
    let baseUrl = req.nextUrl.origin;
    try{
      let h = req.headers
      console.log(req.nextUrl)
    let isAdmin = await (await fetch(baseUrl+"/api/isAdmin",{headers:req.headers})).json();
    console.log("here",isAdmin)
    }catch(err){
      console.error("middleware err:",err)
    }
    
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: async({ req, token }) => {
        let url = new URL(req?.url);
        if(url.pathname==="/admin") return false;
        if(!token) return false;
        return true
      },
    },
  }
)

export const config = { matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.+\..+).*)"] }