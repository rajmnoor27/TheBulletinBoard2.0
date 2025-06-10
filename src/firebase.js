import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Firebase configuration
// Replace the following configuration with your Firebase project credentials.
// You can find your Firebase configuration by following these steps:
// 1. Go to https://console.firebase.google.com/
// 2. Create a new project or select an existing one.
// 3. Navigate to Project Settings > General > Your apps.
// 4. Copy the Firebase configuration object.

const firebaseConfig = {
  apiKey: "YOUR_FIREBASE_API_KEY",
  authDomain: "YOUR_FIREBASE_AUTH_DOMAIN",
  projectId: "YOUR_FIREBASE_PROJECT_ID",
  storageBucket: "YOUR_FIREBASE_STORAGE_BUCKET",
  messagingSenderId: "YOUR_FIREBASE_MESSAGING_SENDER_ID",
  appId: "YOUR_FIREBASE_APP_ID",
  measurementId: "YOUR_FIREBASE_MEASUREMENT_ID",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
