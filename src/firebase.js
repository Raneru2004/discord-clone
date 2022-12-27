import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA0wX0cFqOkP1Ngtqhy1ox7Bul-7K9PAoo",
  authDomain: "discord-clone-c0488.firebaseapp.com",
  projectId: "discord-clone-c0488",
  storageBucket: "discord-clone-c0488.appspot.com",
  messagingSenderId: "757745905177",
  appId: "1:757745905177:web:37badbbc2269625caec488"
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

const db = getFirestore();

const auth = getAuth();

export {db, auth, provider, firebaseApp};