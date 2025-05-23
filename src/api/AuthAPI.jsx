import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  sendPasswordResetEmail,
  getAuth
} from "firebase/auth";
import { auth } from '../firebaseConfig';

//auth will contain all of our data in the project for Authentication 

// export const ForgotPassword = () => {
//   sendPasswordResetEmail(auth, EmailInp.value).then(() => {
//     alert("A Password Reset Link has been send to your email");
//   }).catch((error) => {
//     console.log(error.code);
//     console.log(error.message);
//   })
// }

export const LoginAPI = (email, password) => {
  try {
    let response = signInWithEmailAndPassword(auth, email, password);
    return response;
  } catch (err) {
    return err;
  }
};

export const RegisterAPI = (email, password) => {
  try {
    let response = createUserWithEmailAndPassword(auth, email, password);
    return response;

  } catch (err) {
    return err;
  }
};

export const GoogleSignInAPI = () => {
  try {
    let googleProvider = new GoogleAuthProvider();
    let res = signInWithPopup(auth, googleProvider);
    return res;
  } catch (err) {
    return err;
  }
};

export const onLogout = () => {
  try {
    signOut(auth);
  } catch (err) {
    return err;
  }
};