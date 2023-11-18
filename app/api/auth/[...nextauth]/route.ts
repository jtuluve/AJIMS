import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextApiRequest } from "next";
import { signInWithEmailAndPassword } from "firebase/auth"
import { getApps, getApp, initializeApp, FirebaseOptions } from "firebase/app";
import { getAuth } from "firebase/auth";
import bcrypt from "bcrypt";

interface User {
  id: string;
  name: string;
  role: string;
}

const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Sign In",
      type: "credentials",
      credentials: {},
      async authorize(credentials, req: NextApiRequest): Promise<any> {
        const firebaseConfig: FirebaseOptions = {
          apiKey: process.env.FIREBASE_API_KEY,
          authDomain: process.env.FIREBASE_AUTH_DOMAIN,
          projectId: process.env.FIREBASE_PROJECT_ID,
          storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
          messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
          appId: process.env.FIREBASE_APP_ID,
          measurementId: process.env.FIREBASE_MEASUREMENT_ID,

        };
        // Initialize Firebase
        const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
        // const analytics =  getAnalytics(app);
        const auth = getAuth(app);

        const { id, password } = credentials as {
          id: string;
          password: string;
        };
        if(!id||!password)return new Error("Id or Password not found")
        // const hash = await bcrypt.hash(password,137)
        // console.log(hash)
        return await signInWithEmailAndPassword(auth, id+"@ajims.in" ?? '', password ?? '')
          .then((userCredential) => {
            if (userCredential.user) return userCredential.user
            return null
          })
          .catch(err => console.log(err))
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
    jwt(params: any) {
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