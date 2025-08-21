import{getAuth, GoogleAuthProvider} from "firebase/auth";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "loginstore-aef5d.firebaseapp.com",
  projectId: "loginstore-aef5d",
  storageBucket: "loginstore-aef5d.firebasestorage.app",
  messagingSenderId: "166263828707",
  appId: "1:166263828707:web:bb85c4e26ed9b0323615d6"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };