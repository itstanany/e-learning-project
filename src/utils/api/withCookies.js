import Cookies from 'cookies';
import { userCookiesOptions } from '../common/userCookiesOptions';

const withCookies = (handler) => async (req, res) => {
  const cookies = new Cookies(req, res, userCookiesOptions);
  return (handler(req, res, { cookies }));
};

export default withCookies;
export {
  withCookies,
};
