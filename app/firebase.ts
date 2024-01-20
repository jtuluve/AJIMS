import { getApps, getApp, initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyBfmcZYFlH4EMDqtIaMY8oyvyNOjcg_8Wk',
  authDomain: 'ajims-908b2.firebaseapp.com',
  projectId: 'ajims-908b2',
  storageBucket: 'ajims-2eae5.appspot.com',
  // storageBucket: "ajims-908b2.appspot.com",
  messagingSenderId: '679380719270',
  appId: '1:679380719270:web:775b4a2a2b6597cbb90667',
  measurementId: 'G-2LRZW4Q539',
}

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig)
const auth = getAuth(app)

export { app, auth }
