// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDIFMyClZjqOdHTSFjuL5AsoOJvr3bETIM",
  authDomain: "online-jobportal.firebaseapp.com",
  projectId: "online-jobportal",
  storageBucket: "online-jobportal.appspot.com",
  messagingSenderId: "686085648258",
  appId: "1:686085648258:web:09dac62b7b114b62ea299b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);  
const db = getFirestore(app)


export {db}