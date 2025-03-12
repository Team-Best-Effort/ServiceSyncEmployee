// firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyC-zHokpPV316sdixgDhPizAgz4h_m1U84",
  authDomain: "fir-for-auth-web-app.firebaseapp.com",
  projectId: "fir-for-auth-web-app",
  storageBucket: "fir-for-auth-web-app.firebasestorage.app",
  messagingSenderId: "79542475148",
  appId: "1:79542475148:web:2e835ba094dbf469979ea9",
  measurementId: "G-CVX4XY78EL",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);
