import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyDpUwwmA2BgwCJXPOQvNyfqNRgHN4b7L_w",
  authDomain: "wa-clone-a5f8f.firebaseapp.com",
  projectId: "wa-clone-a5f8f",
  storageBucket: "wa-clone-a5f8f.appspot.com",
  messagingSenderId: "99280986077",
  appId: "1:99280986077:web:738bff1872fe2d21426034",
  measurementId: "G-XRV6W52V3W",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
// const auth = firebase.auth();
// const provider = new firebase.auth.GoogleAuthProvider();

// export { auth, provider };
export default db;
