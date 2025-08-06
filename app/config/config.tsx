// firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Firebase Configuration Object
const firebaseConfig = {
  apiKey: "AIzaSyCFtPpMEOvcJc5w_DB1IDQK2Y9g9TZXAQc",
  authDomain: "lok-lagbe-d452a.firebaseapp.com",
  projectId: "lok-lagbe-d452a",
  storageBucket: "lok-lagbe-d452a.appspot.com",  // Corrected storage bucket
  messagingSenderId: "910061997974",
  appId: "1:910061997974:web:345a0660299ed0741bd7b7",
  measurementId: "G-DPDDEDFB7B"
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
const auth = getAuth(app);

export { app, auth };
