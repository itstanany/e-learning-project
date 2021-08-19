import { withCookies } from '../../../utils/api/withCookies';
import { adminApp, adminFirestore } from '../../../firebase/admin';

const getUserDoc = ({ uid }) => adminFirestore.doc(`/users/${uid}`).get().then((docRef) => docRef.data());

const handler = async (req, res, { cookies }) => {
  const userCookie = JSON.parse(cookies.get('user') || null);
  if (!userCookie) {
    res.json({ user: null });
  } else {
    const userDoc = await (await adminApp.firestore().doc(`/users/${userCookie.uid}`).get()).data();
    console.log({ userDoc });
    res.json({ userDoc });
  }
};

export default withCookies(handler);

export {
  getUserDoc,
};
