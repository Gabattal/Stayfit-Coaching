import { initializeApp } from "firebase/app";
import { getFirestore, collection, DocumentData, CollectionReference, QueryDocumentSnapshot } from "firebase/firestore";

export const firebaseApp = initializeApp({
    apiKey: "AIzaSyBn8QbfDSPy3wtFpUay3SdHj1p-Kx_B6cA",
    appId: "1:927696896353:web:de3aa54f041f6421558520",
    authDomain: "stayfit-c2b5e.firebaseapp.com",
    measurementId: "G-5PE9K4V7TC",
    messagingSenderId: "927696896353",
    projectId: "stayfit-c2b5e",
    storageBucket: "stayfit-c2b5e.appspot.com"
});

export const firestore = getFirestore(firebaseApp);

const converter = <T>() => ({
    fromFirestore: (snap: QueryDocumentSnapshot) => snap.data() as T,
    toFirestore: (data: T) => data as DocumentData
});

const dataPoint = <T>(collectionPath: string) => collection(firestore, collectionPath).withConverter(converter<T>());


export type TUserCollection = {
    customers?: CollectionReference<TCustomerCollection>;
    first_name: string;
    isAdmin?: boolean;
    last_name: string;
    mail: string;
    phone: string;
};

export type TCustomerCollection = {
    availabilities: [];
    diseasePrecision: string;
    diseases: [];
    first_name: string;
    last_name: string;
    mail: string;
    objectivePrecision: string;
    objectives: [];
    phone: string;
}

export type TPackCollection = {
    coachId: string;
    customerId: string;
    packName: string;
    sessionsMonthsLeft: number;
    sessionsMonthsTotal: number;
    totalAmount: number;
    totalAmountForCoach: number;
    totalAmountForCoachPaid: number;
    totalAmountForGym: number;
    totalAmountForGymPaid: number;
    totalAmountPaid: number;
}

export const db = {
    customers: dataPoint<TCustomerCollection>("customers"),
    packs: dataPoint<TPackCollection>("packs"),
    users: dataPoint<TUserCollection>("users")
};



