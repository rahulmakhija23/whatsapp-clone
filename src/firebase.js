import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
// new update in firestore imports are update please
const firebaseConfig = {
  apiKey: "AIzaSyBzjlHIge4Q7WKCAv86wYtiHB3d7FW2cPA",
  authDomain: "whatsapp-clone-25e47.firebaseapp.com",
  projectId: "whatsapp-clone-25e47",
  storageBucket: "whatsapp-clone-25e47.appspot.com",
  messagingSenderId: "621707259612",
  appId: "1:621707259612:web:be00fb4b1a903ff24f0e19",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
// this is for google authentication
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
