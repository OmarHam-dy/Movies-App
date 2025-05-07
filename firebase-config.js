// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAx5plNU_J0DYFjAK565sQx_YqEnpSemis",
  authDomain: "movies-app-65487.firebaseapp.com",
  projectId: "movies-app-65487",
  storageBucket: "movies-app-65487.firebasestorage.app",
  messagingSenderId: "213389208653",
  appId: "1:213389208653:web:b49851803d6eaf45a28004",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
