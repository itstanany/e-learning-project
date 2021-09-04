import { adminFirestore } from '../../firebase/admin';

const createNewUserDoc = ({
  name, email, phoneNumber = null, picture = null, uid, role,
}) => adminFirestore.collection('users').doc(uid).set({
  name,
  email,
  picture,
  phoneNumber,
  subscription: [],
  uid,
  role: role || 'user',
});

export { createNewUserDoc };
