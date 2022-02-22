import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
require('dotenv').config();


//firebase config which is provided by firebase
const firebaseConfig = {

  // measurementId: "G-M7WGZF2Y26"
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STOREAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID
};

const app = initializeApp(firebaseConfig);


//firebase cloud storage which is called as firestore
const db = getFirestore(app);

export default db;
