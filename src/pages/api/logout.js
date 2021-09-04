import { userCookiesOptions, withCookies } from '../../utils/server';

/**
 * Delete auth cookies on logout
 * @param {*} req NextJs Request object
 * @param {*} res NextJs response Object
 * @param {cookies} param2 cookies field is an initialized Cookies object
 */
const handler = async (req, res, { cookies }) => {
  cookies.set('user', undefined, userCookiesOptions);
  res.end();
};

export default withCookies(handler);
