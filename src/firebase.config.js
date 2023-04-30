// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:"AIzaSyCKfw3eOkKBf5p4OV_HdSs0euOOasFZvJY",
  authDomain: "menusn.firebaseapp.com",
  projectId: "menusn",
  storageBucket: "menusn.appspot.com",
  messagingSenderId: "1086942795192",
  appId: "1:1086942795192:web:39a9b2e95a2e322a56eb4d",
};


// Initialize Firebase
//const app = initializeApp(firebaseConfig);
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
export const auth = getAuth(firebaseApp);

  export default db;