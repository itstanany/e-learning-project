import Cookies from 'cookies';
import { cookieKeys } from '../common/cookiesKeys';

const getUserCookie = (req, res) => {
  const cookies = new Cookies(req, res, { keys: cookieKeys });
  return JSON.parse(cookies.get('user', { signed: true }) || null);
};

export {
  getUserCookie,
};
