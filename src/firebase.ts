import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCO7klYJid9hbWw6hnYNU_WDhaGlg-gQRA",
  authDomain: "tele-v-u-e.firebaseapp.com",
  projectId: "tele-v-u-e",
  storageBucket: "tele-v-u-e.appspot.com",
  messagingSenderId: "711509364043",
  appId: "1:711509364043:web:4862a57ed07075061c6cce",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
