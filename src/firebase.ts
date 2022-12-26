import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";

export const firebaseApp = initializeApp({
    apiKey: "AIzaSyBn8QbfDSPy3wtFpUay3SdHj1p-Kx_B6cA",
    appId: "1:927696896353:web:de3aa54f041f6421558520",
    authDomain: "stayfit-c2b5e.firebaseapp.com",
    measurementId: "G-5PE9K4V7TC",
    messagingSenderId: "927696896353",
    projectId: "stayfit-c2b5e",
    storageBucket: "stayfit-c2b5e.appspot.com"
});

// used for the firestore refs
const db = getFirestore(firebaseApp);

// here we can export reusable database references
export const usersRef = collection(db, "users");
