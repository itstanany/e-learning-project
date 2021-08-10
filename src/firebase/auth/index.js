import 'firebase/auth';
import firebase from 'firebase/app'
const auth = firebase.auth();

export { auth }
export * from './google.auth';
export * from './initAuth';