
// Import the functions you need from the SDKs you need
import { getApps, getApp, initializeApp, FirebaseOptions } from "firebase/app";
import { getAuth } from "firebase/auth";






export function GET() {
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
    return Response.json({auth,app})
}
