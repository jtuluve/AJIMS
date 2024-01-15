// import NextAuth, { NextAuthConfig } from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
// import { initializeApp, getApps, getApp } from "firebase/app";
// import { createUserIfNotExists } from "@/lib/mongoose/functions";
// import { NextApiRequest } from "next";
// import { NextRequest, NextResponse } from "next/server";

// const firebaseConfig = {
//   apiKey: process.env.FIREBASE_API_KEY,
//   authDomain: process.env.FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.FIREBASE_PROJECT_ID,
//   storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.FIREBASE_APP_ID,
//   measurementId: process.env.FIREBASE_MEASUREMENT_ID,
// };

// const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

// export async function POST(req: NextApiRequest) {
//   try {
//     const auth = getAuth(app);
//     const { id="", password="" } ={};
//     console.log(req,req.body,req.read?.(),req.headers)
//     if (!id || !password) {
//       return NextResponse.json({ ok: false, message: "Invalid credentials", status: 401});
//     }
//     const userCredential = await signInWithEmailAndPassword(auth, id + "@ajims.in", password);
//     const user = userCredential?.user;
//     console.log("login user:", user)
//     if (user) {
//       createUserIfNotExists({ uid: user.uid, email: user.email });
//       return NextResponse.json({ ok: true, message: "Success", status: 200, user});
//     } else {
//       return NextResponse.json({ ok: false, message: "Invalid credentials", status: 401});
//     }
//   } catch (error) {
//     console.error("Authentication error(login):", error);
//     return NextResponse.json({ ok: false, message: "Invalid credentials(Internal Error)", status: 401});
//   }
// }
