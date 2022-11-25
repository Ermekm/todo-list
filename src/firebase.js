// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore/lite';
import { getStorage } from "firebase/storage"

// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyB9FhLOpoX2RS0ZkTj3fB46qoY4ajAvx0A",
    authDomain: "todo-list-59855.firebaseapp.com",
    projectId: "todo-list-59855",
    storageBucket: "todo-list-59855.appspot.com",
    messagingSenderId: "280360927267",
    appId: "1:280360927267:web:905884e72dbdd4ad84f196",
    measurementId: "G-9XCYTPD7XS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const storage = getStorage(app)
export const db = getFirestore(app)

