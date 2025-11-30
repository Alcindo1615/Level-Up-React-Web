// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // PERMITE OBTENER LA BASE DE DATOS DE FIRESTORE
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBDkpybIHJbODKG2I9K5gn2IVtnY8Ol3XM",
  authDomain: "level-up-web-4664d.firebaseapp.com",
  projectId: "level-up-web-4664d",
  storageBucket: "level-up-web-4664d.firebasestorage.app",
  messagingSenderId: "842726534946",
  appId: "1:842726534946:web:d3f71b07ce028d48943f7b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app); // BASE DE DATOS