
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDFMsAQE5Tdwrv60YvT4NZCPwWwuwJy_nc",
  authDomain: "react-ecommerce-ferreteria.firebaseapp.com",
  projectId: "react-ecommerce-ferreteria",
  storageBucket: "react-ecommerce-ferreteria.appspot.com",
  messagingSenderId: "837947150026",
  appId: "1:837947150026:web:1a0cbd86c0e1f8b344ee33"
};


const app = initializeApp(firebaseConfig);

export const dataBase = getFirestore(app)

