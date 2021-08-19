import { userCookiesOptions } from '../../utils/common/userCookiesOptions';
import { withCookies } from '../../utils/api/withCookies';
import { adminApp } from '../../firebase/admin';
import { createNewUserDoc } from '../../utils/api';

/**
 * create new document of "users" collection
 *  cerated object shape: show draw.io project planning.
 * @param {*} param0 object of use info
 * @returns void
 */

const handler = async (req, res, { cookies }) => {
  try {
    const { idToken, isNewUser, role = 'user' } = req.body;
    const result = await adminApp.auth().verifyIdToken(idToken);
    console.log({ result });
    // console.log({ userCookiesOptions });
    cookies.set('user', JSON.stringify({ uid: result.uid, role: result.role || 'admin' }), userCookiesOptions);
    if (isNewUser) {
      adminApp.auth().setCustomUserClaims(result.uid, { role: 'admin' });
      createNewUserDoc({ role, ...result });
    }
    res.json({ auth: true });
  } catch (error) {
    // console.log({ error });
    res.json({ auth: false });
  }
};
export default withCookies(handler);
