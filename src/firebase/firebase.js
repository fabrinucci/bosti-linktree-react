import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { 
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  getBytes,
} from 'firebase/storage';
import {
  getFirestore,
  collection,
  query,
  where,
  addDoc,
  doc,
  deleteDoc,
  getDoc,
  getDocs,
  setDoc,
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  projectId: process.env.REACT_APP_PROJECTID,
  storageBucket: process.env.REACT_APP_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_APPID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export {
  app,
  auth,
}

export async function userExists( uid ) {
  const docRef = doc( db, 'users', uid );
  const res = await getDoc( docRef );
  console.log(res);
  return res.exists();
} 