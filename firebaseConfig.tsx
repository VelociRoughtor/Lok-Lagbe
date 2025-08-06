// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBfzm2PMxv6l9IQA2lqXuDag7EcJQDeARA",
  authDomain: "loklagbe-cfcfd.firebaseapp.com",
  projectId: "loklagbe-cfcfd",
  storageBucket: "loklagbe-cfcfd.appspot.com",
  messagingSenderId: "106935080483",
  appId: "1:106935080483:web:bb0d13ec04dd66b4bfc396",
  measurementId: "G-T8K4PK0V7V"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
