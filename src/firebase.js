import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyDAus3Lu6DrQKrX6xYlHrlUhD4AT2ozx7o",
    authDomain: "whatsapp-clone-e1575.firebaseapp.com",
    databaseURL: "https://whatsapp-clone-e1575.firebaseio.com",
    projectId: "whatsapp-clone-e1575",
    storageBucket: "whatsapp-clone-e1575.appspot.com",
    messagingSenderId: "1064395745077",
    appId: "1:1064395745077:web:c5b5b6d699c705d6e10e7c",
    measurementId: "G-LSB5VBK1VE"
  };


const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export {auth, provider};
export default db; 