import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDHULs4gwhZfuo33X2CAR8H5m_fdSuuqfw",
  authDomain: "disclonez.firebaseapp.com",
  databaseURL: "https://disclonez.firebaseio.com",
  projectId: "disclonez",
  storageBucket: "disclonez.appspot.com",
  messagingSenderId: "417867671308",
  appId: "1:417867671308:web:881d71baf63c13587bcb29",
  measurementId: "G-6PT3SL5MGQ",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
