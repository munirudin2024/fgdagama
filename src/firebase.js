// src/firebase.js

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDPNgVu1H9j66j8QGW1MZpi5JOKvPTh5Ec",
  authDomain: "kelompok2-livechat.firebaseapp.com",
  projectId: "kelompok2-livechat",
  storageBucket: "kelompok2-livechat.firebasestorage.app",
  messagingSenderId: "945330769068",
  appId: "1:945330769068:web:61b6394354185e94cb2309",
  measurementId: "G-HEH84S59LH"
};

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);

// Inisialisasi Firestore
export const db = getFirestore(app);

// Inisialisasi Realtime Database (Jika Anda memilih yang ini)
// import { getDatabase } from "firebase/database";
// export const rtdb = getDatabase(app);