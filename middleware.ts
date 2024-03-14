import { NextRequestWithAuth, withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server";

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  async function middleware(req:NextRequestWithAuth) {
    let pathname = req.nextUrl?.pathname;
    let baseUrl = req.nextUrl?.origin;
    let token = req.nextauth?.token;
    console.log("ran middleware for",pathname,"with token",token);
    try{
      if(!token && pathname!=="/") return NextResponse.redirect(baseUrl);
      if(!token) return NextResponse.next()
      let isAdmin = (await (await fetch(baseUrl+"/api/isAdmin",{method:"POST",body:JSON.stringify({email:token?.email})})).json())?.isAdmin;
      if(isAdmin && !pathname.startsWith("/admin")) return NextResponse.redirect(baseUrl+"/admin");
      if(pathname.startsWith("/admin") && !isAdmin) return NextResponse.redirect(baseUrl+"/main"); 
    }catch(err){
      console.error("middleware err:",err,"for req:",req)
    }
    
    return NextResponse.next();
  },
  {
     callbacks: {
      authorized: async({ token }) => {
        if(!token) return false;
        console.log("allowed")
        return true
      },
    }, 
    pages: {
      signIn: "/",
    }
  } 
)

export const config = { matcher: ["/((?!api|_next/static|_next/image|favicon\\.ico|.+\\..+).*)"] }