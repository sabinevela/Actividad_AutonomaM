// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDPK-3lwokpGro97JXq9Czft9-UL5QSuK8",
  authDomain: "autenticacion-3f404.firebaseapp.com",
  projectId: "autenticacion-3f404",
  storageBucket: "autenticacion-3f404.firebasestorage.app",
  messagingSenderId: "156421656408",
  appId: "1:156421656408:web:eb7a1f969871f9949e5f2d",
  measurementId: "G-WPVM8PY4L5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
