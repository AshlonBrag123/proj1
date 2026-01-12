import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyBnsiVt9hLYA4iB4k2DBqblPMTzjBNq0vQ",
  authDomain: "testapp-51c3c.firebaseapp.com",
  projectId: "testapp-51c3c",
  storageBucket: "testapp-51c3c.firebasestorage.app",
  messagingSenderId: "928002592446",
  appId: "1:928002592446:web:4ee778e5f1e282c0f018ef",
  measurementId: "G-H8PF2Q2CX2"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = initializeAuth(app, {
    persistence:
    getReactNativePersistence(ReactNativeAsyncStorage)
});
export const db = getFirestore(app);
