
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = typeof __firebase_config !== 'undefined' 
  ? JSON.parse(__firebase_config) 
  : {
      apiKey: "API_KEY",
      authDomain: "PROJECT.firebaseapp.com",
      projectId: "PROJECT_ID",
      storageBucket: "PROJECT.appspot.com",
      messagingSenderId: "...",
      appId: "..."
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';