import * as myBase from "firebase/app";
import "firebase/auth";

import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDIFgV9bq3w3n6lLm-CSIJWfxTwt6b5bGU",
  authDomain: "nwitter-b326e.firebaseapp.com",
  projectId: "nwitter-b326e",
  storageBucket: "nwitter-b326e.appspot.com",
  messagingSenderId: "883954183544",
  appId: "1:883954183544:web:48754a990fcd43ba9a2c8d",
};

myBase.initializeApp(firebaseConfig);
export const authService = getAuth();
