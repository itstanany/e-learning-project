import { adminFirestore } from '../../firebase/admin';

const getUserDoc = ({ uid }) => adminFirestore.doc(`/users/${uid}`).get().then((docRef) => docRef.data());
export {
  getUserDoc,
};
