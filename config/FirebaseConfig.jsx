// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDlZo-OE3F84zULewFlEuSIzuSXoTkBfPQ",
  authDomain: "meditrack-2d852.firebaseapp.com",
  projectId: "meditrack-2d852",
  storageBucket: "meditrack-2d852.firebasestorage.app",
  messagingSenderId: "526208113607",
  appId: "1:526208113607:web:7cf0b432cdfcd556dc97e2",
  measurementId: "G-LYP7WF24PC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app);