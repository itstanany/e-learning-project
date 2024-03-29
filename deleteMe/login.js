import {
  withCookies, createNewUserDoc, userCookiesOptions,
} from '../src/utils/server';
import { adminApp } from '../src/firebase/admin';
import { jwtGenerate } from '../src/utils/server/jwt';

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
    const userCookie = jwtGenerate({ uid: result.uid, role: result.role || 'user' });
    // cookies.set('user', JSON.stringify(
    // { uid: result.uid, role: result.role || 'user' }), userCookiesOptions);
    cookies.set('user', userCookie, userCookiesOptions);
    if (isNewUser) {
      adminApp.auth().setCustomUserClaims(result.uid, { role: 'user' });
      createNewUserDoc({ role, ...result });
    }
    res.json({ auth: true });
  } catch (error) {
    console.log({ error });
    res.json({ auth: false });
  }
};
export default withCookies(handler);
