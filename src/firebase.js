import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getAuth, signOut } from "firebase/auth"


const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_FIREBASE_KEY,
  authDomain: "watchlist-60f6f.firebaseapp.com",
  projectId: "watchlist-60f6f",
  storageBucket: "watchlist-60f6f.appspot.com",
  messagingSenderId: "988680512766",
  appId: "1:988680512766:web:8ce1f341cdf1f765f8b1af"
};

const app = initializeApp(firebaseConfig)
const auth = getAuth()
const db = getFirestore(app)

export {auth, db, signOut}