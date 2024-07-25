// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA4a5_Ir0qgWSdI-ZTJsuVRa6EVERDTLd8",
  authDomain: "netflixgpt-dd045.firebaseapp.com",
  projectId: "netflixgpt-dd045",
  storageBucket: "netflixgpt-dd045.appspot.com",
  messagingSenderId: "364246775357",
  appId: "1:364246775357:web:f239a7879518f313885c54",
  measurementId: "G-JJY18SFRPV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();