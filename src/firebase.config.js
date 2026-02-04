import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB7033RnH9hSg_aJ0XMsYaOgaGW48s75Gk",
  authDomain: "makitimaonline-93d4c.firebaseapp.com",
  projectId: "makitimaonline-93d4c",
  storageBucket: "makitimaonline-93d4c.appspot.com",
  messagingSenderId: "259674915508",
  appId: "1:259674915508:web:60ea6c7278ff97de474de1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
