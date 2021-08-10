import firebase from 'firebase/app';
import { auth } from './index'

const googleProvider = new firebase.auth.GoogleAuthProvider();

const signinWithGoogle = () => auth.signInWithPopup(googleProvider);

export {
  googleProvider,
  signinWithGoogle,
};
