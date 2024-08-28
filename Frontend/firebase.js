// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC9EmcL0bjpcGtPcjoQAB-tMbbev06h4zw",
  authDomain: "palletcam21.firebaseapp.com",
  projectId: "palletcam21",
  storageBucket: "palletcam21.appspot.com",
  messagingSenderId: "291502064119",
  appId: "1:291502064119:web:c96d7a5c90db3f605d2ef2",
  measurementId: "G-HSEJ0ED6FT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { db };