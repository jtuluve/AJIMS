import NextAuth,{AuthOptions} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { initializeApp, getApps, getApp } from "firebase/app";
import { createUserIfNotExists } from "@/lib/mongoose/functions";
import { NextApiRequest } from "next";
import { NextRequest, NextResponse } from "next/server";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

const authOptions:AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Sign In",
      type: "credentials",
      credentials: {},
      // credentials options
      async authorize(credentials, req) {
        try {
          const auth = getAuth(app);
          const { id, password } = credentials as {
            id: string;
            password: string;
          };
          const userCredential = await signInWithEmailAndPassword(auth, id + '@ajims.in', password);
          const user = userCredential.user;

          if (user) {
            await createUserIfNotExists({uid:user.uid, email:user.email});
            return Promise.resolve(user);
          } else {
            return Promise.resolve(null);
          }
        } catch (error) {
          console.error("Authentication error:", error);
          return Promise.resolve(null);
        }
      },
    }),
    // other providers
  ],
  pages: {
    signIn: "/",
  },
  session: {
    strategy: "jwt",
  },
};
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
