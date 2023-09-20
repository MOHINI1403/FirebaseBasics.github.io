// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
import { getAnalytics } from "firebase/analytics";
import {getStorage} from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB3f783e0wSGUYxAhu31JXX68u-7zZ247U",
  authDomain: "fir-frontend-d88c3.firebaseapp.com",
  projectId: "fir-frontend-d88c3",
  storageBucket: "fir-frontend-d88c3.appspot.com",
  messagingSenderId: "440694791964",
  appId: "1:440694791964:web:557e1fb3d28e2de59224d9",
  measurementId: "G-BZT4BPBY6M"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const database=getFirestore(app);
export const storage=getStorage(app);