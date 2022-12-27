import { initializeApp } from "firebase/app";
import { getFirestore, collection, CollectionReference, DocumentData } from "firebase/firestore";

export const firebaseApp = initializeApp({
    apiKey: "AIzaSyBn8QbfDSPy3wtFpUay3SdHj1p-Kx_B6cA",
    appId: "1:927696896353:web:de3aa54f041f6421558520",
    authDomain: "stayfit-c2b5e.firebaseapp.com",
    measurementId: "G-5PE9K4V7TC",
    messagingSenderId: "927696896353",
    projectId: "stayfit-c2b5e",
    storageBucket: "stayfit-c2b5e.appspot.com"
});

export const db = getFirestore(firebaseApp);

const createCollection = <T = DocumentData>(collectionName: string) => {
    return collection(db, collectionName) as unknown as CollectionReference<T>;
};

type TUserCollection = {
    first_name: string;
    isAdmin: boolean;
    last_name: string;
    mail: string;
    phone: string;
};

export const usersRef = createCollection<TUserCollection>("users");
