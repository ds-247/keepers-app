import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyAFzvvHlPdJyIwsaEVnoFLoYoIimV0zIAo",
  authDomain: "keeper-ed6d4.firebaseapp.com",
  projectId: "keeper-ed6d4",
  storageBucket: "keeper-ed6d4.appspot.com",
  messagingSenderId: "369279982902",
  appId: "1:369279982902:web:82b42f4cc92f5b70026797",
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();


export const db = getFirestore(app);

