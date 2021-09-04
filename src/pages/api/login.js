import {
  withCookies, createNewUserDoc, userCookiesOptions,
} from '../../utils/server';
import { adminApp } from '../../firebase/admin';

/**
 * create new document of "users" collection
 *  cerated object shape: show draw.io project planning.
 * @param {*} param0 object of use info
 * @returns json response with field "auth", true for success login authentication false, otherise
 */

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
