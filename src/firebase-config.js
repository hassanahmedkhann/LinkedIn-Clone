import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCnDn_0FbOmJX_IgHgqzkAL8YD2Tv9G5lU",
  authDomain: "linkedin-clone-e98ce.firebaseapp.com",
  projectId: "linkedin-clone-e98ce",
  storageBucket: "linkedin-clone-e98ce.appspot.com",
  messagingSenderId: "1061997920030",
  appId: "1:1061997920030:web:96c595bafc89d082d4930f",
};

//Initializing Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
