import Cookies from 'cookies';
import { cookieKeys } from './cookiesKeys';
import { jwtVerify } from './jwt';

const getUserCookie = (req, res) => {
  try {
    const cookies = new Cookies(req, res, { keys: cookieKeys });
    const userCookie = cookies.get('user', { signed: true });
    const user = jwtVerify({ token: userCookie });
    return user;
    // return JSON.parse(cookies.get('user', { signed: true }) || null);
  } catch (error) {
    return null;
  }
};

export {
  getUserCookie,
};
