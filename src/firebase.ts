// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
const {
  VITE_APP_APIKEY,
  VITE_APP_AUTHDOMAIN,
  VITE_APP_PROJECTID,
  VITE_APP_STORAGE,
  VITE_APP_SENDERID,
  VITE_APP_APPID,
  VITE_APP_DATABASE,
} = import.meta.env;
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: VITE_APP_APIKEY,
  authDomain: VITE_APP_AUTHDOMAIN,
  projectId: VITE_APP_PROJECTID,
  storageBucket: VITE_APP_STORAGE,
  messagingSenderId: VITE_APP_SENDERID,
  appId: VITE_APP_APPID,
  databaseURL: VITE_APP_DATABASE,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);
