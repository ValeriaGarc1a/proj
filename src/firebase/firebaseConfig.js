// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // Importa Firestore
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDJ81ufg2JJGwSwm_lsSMJ7DMm9XV3IcXo",
  authDomain: "posproj-ea097.firebaseapp.com",
  projectId: "posproj-ea097",
  storageBucket: "posproj-ea097.firebasestorage.app",
  messagingSenderId: "786415874265",
  appId: "1:786415874265:web:8c5481c091e5a45bc94ec8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
