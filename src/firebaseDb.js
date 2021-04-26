import firebase from 'firebase';


const firebaseConfig = {

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
    
    apiKey: "AIzaSyAEBMx_ABx7UIKDWZPNiyZqUDTbIFU1wIQ",
    authDomain: "pre-med-ffbb1.firebaseapp.com",
    projectId: "pre-med-ffbb1",
    storageBucket: "pre-med-ffbb1.appspot.com",
    messagingSenderId: "887211409886",
    appId: "1:887211409886:web:7111432aa3ab0e7f409d4f",
    measurementId: "G-L7KJ7X8NM7"
}

const firebaseApp = firebase.initializeApp(firebaseConfig);

export const db = firebaseApp.firestore();