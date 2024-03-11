import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server";

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  async function middleware(req) {
    let pathname = req.nextUrl?.pathname;
    let baseUrl = req.nextUrl?.origin;
    let token = req.nextauth?.token;
    if(!/\/((?!api|_next\/static|_next\/image|favicon.ico|.+\..+).*)/.test(pathname)){
      return NextResponse.next();
    }
    try{
      let h = new Headers({cookie:req.headers.get("cookie")});
      if(!token && pathname!=="/") return NextResponse.redirect(baseUrl);
      let isAdmin = (await (await fetch(baseUrl+"/api/isAdmin",{headers:h})).json())?.isAdmin;
      if(pathname.startsWith("/admin") && !isAdmin) return NextResponse.redirect(baseUrl+"/main"); 
    }catch(err){
      console.error("middleware err:",err)
    }
    
    return NextResponse.next();
  },
  {
    /* callbacks: {
      authorized: async({ req, token }) => {
        let url = new URL(req?.url);
        if(url.pathname==="/admin") return false;
        if(!token) return false;
        return true
      },
    }, */
    pages: {
      signIn: "/",
    }
  } 
)

export const config = { matcher: ["/((?!api).*)"] }