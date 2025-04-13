import { initializeApp } from "firebase/app";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB5iiJCp-XG420V0qXDzWjdYhOhSKgidBM",
  authDomain: "fir-otp-login-3d0e0.firebaseapp.com",
  projectId: "fir-otp-login-3d0e0",
  storageBucket: "fir-otp-login-3d0e0.appspot.com",
  messagingSenderId: "806679687595",
  appId: "1:806679687595:web:969b12e86d1655191c22ee",
  measurementId: "G-JSQRHRR67Q"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export { RecaptchaVerifier, signInWithPhoneNumber };
