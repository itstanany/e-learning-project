import { userCookiesOptions } from '../../utils/api/useCookiesOptions';
import { withCookies } from '../../utils/api/withCookies';
import { adminApp } from './firebaseAdmin.config';

/**
 * create new document of "users" collection
 *  cerated object shape: show draw.io project planning.
 * @param {*} param0 object of use info
 * @returns void
 */
const createNewUserDoc = ({
  name, email, phoneNumber = null, picture = null, uid, role,
}) => adminApp.firestore().collection('users').doc(uid).set({
  name,
  email,
  picture,
  phoneNumber,
  subscription: [],
  uid,
  role: role || 'user',
});

const handler = async (req, res, { cookies }) => {
  try {
    const { idToken, isNewUser, role = 'user' } = req.body;
    const result = await adminApp.auth().verifyIdToken(idToken);
    cookies.set('user', JSON.stringify({ uid: result.uid, role: result.role || 'user' }), userCookiesOptions);
    if (isNewUser) {
      adminApp.auth().setCustomUserClaims(result.uid, { role: 'user' });
      createNewUserDoc({ role, ...result });
    }
    res.json({ auth: true });
  } catch (error) {
    res.json({ auth: false });
  }
};
export default withCookies(handler);
