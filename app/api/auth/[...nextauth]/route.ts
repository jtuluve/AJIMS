import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextApiRequest } from "next";
import {signInWithEmailAndPassword} from "firebase/auth"
import {auth} from "@/app/firebase"
interface User {
  id:string;
  name:string;
  role:string;
}

const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name:"Sign In",
      type: "credentials",
      credentials: {},
      async authorize(credentials, req: NextApiRequest):Promise<any> {
        const { id, password } = credentials as {
          id: string;
          password: string;
        };
        console.log(id,password)
        return await signInWithEmailAndPassword(auth,id ?? '',password ?? '')
          .then((userCredential) =>{
            console.log(userCredential)
            if(userCredential.user) return userCredential.user
            return null
          })
          .catch(err=>console.log(err))
      }
      ,
      }),
  ],
  pages: {
    signIn: "/",
    // error: '/auth/error',
    // signOut: '/auth/signout'
  },
  callbacks: {
    jwt(params:any) {
      // update token
      if (params.user?.role) {
        params.token.role = params.user.role;
      }
      // return final_token
      return params.token;
    },
  },
};
const handler = NextAuth(authOptions)



export { handler as GET, handler as POST };