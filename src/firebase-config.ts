import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore/lite';

const firebaseConfig = {
    apiKey: "AIzaSyCq--3YS6ZiygE-kVx8UI01LzAq72v-er4",
    authDomain: "comment-component.firebaseapp.com",
    projectId: "comment-component",
    storageBucket: "comment-component.appspot.com",
    messagingSenderId: "217452375938",
    appId: "1:217452375938:web:4b4ffe5d23e095433b699b",
    measurementId: "G-Q4KX4JQJZX"
  };
  

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);