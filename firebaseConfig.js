import { initializeApp } from "firebase/app";
// import { getAuth, connectAuthEmulator } from 'firebase/auth';

// const auth = getAuth(app);

//connectAuthEmulator(auth, 'http://localhost:9099');

const firebaseConfig = {
  apiKey: "AIzaSyCtoxhPXhkAiffuShPudyUcaKlRiutwy18",
  authDomain: "booksreviewpr.firebaseapp.com",
  projectId: "booksreviewpr",
  storageBucket: "booksreviewpr.firebasestorage.app",
  messagingSenderId: "960060722568",
  appId: "1:960060722568:web:a02ef1b3ed3038f6747e3d",
  measurementId: "G-48FM4CV73Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;




