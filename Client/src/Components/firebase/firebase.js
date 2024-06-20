import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC3knuCB-Zw-r7UHu2Ehj1S-4Flwn-bI64",
  authDomain: "kuber-e632f.firebaseapp.com",
  projectId: "kuber-e632f",
  storageBucket: "kuber-e632f.appspot.com",
  messagingSenderId: "675327616923",
  appId: "1:675327616923:web:b465440695bb0a3912233e",
  measurementId: "G-JTCGDJWGE6"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const analytics = getAnalytics(app);

export { storage };