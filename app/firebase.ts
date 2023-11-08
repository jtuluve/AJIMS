// Import the functions you need from the SDKs you need

import { getApps,getApp,initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBfmcZYFlH4EMDqtIaMY8oyvyNOjcg_8Wk",
  authDomain: "ajims-908b2.firebaseapp.com",
  projectId: "ajims-908b2",
  storageBucket: "ajims-908b2.appspot.com",
  messagingSenderId: "679380719270",
  appId: "1:679380719270:web:775b4a2a2b6597cbb90667",
  measurementId: "G-2LRZW4Q539"
};

// Initialize Firebase
const app = getApps().length?getApp() :initializeApp(firebaseConfig);
// const analytics =  getAnalytics(app);
const auth = getAuth(app)

export {app, auth, /* analytics */}