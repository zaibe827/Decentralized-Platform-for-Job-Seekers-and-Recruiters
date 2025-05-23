// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAZGiQj-PPacujepPgvXvy-EFIlfll-y14",
  authDomain: "job-portal-website-d5a9b.firebaseapp.com",
  projectId: "job-portal-website-d5a9b",
  storageBucket: "job-portal-website-d5a9b.appspot.com",
  messagingSenderId: "347352872683",
  appId: "1:347352872683:web:f2c50b5aa836b6893870ae",
  measurementId: "G-FYFFN6N8B7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=getAuth(app);
const firestore=getFirestore(app);
const storage=getStorage(app);

// const analytics = getAnalytics(app);
export {auth,app,firestore,storage}
