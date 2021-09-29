import Cookies from 'cookies';
import { userCookiesOptions } from './userCookiesOptions';

/**
 * method to call api handler with "cookies" object as a field in a third argument object
 * @param {*} handler Nextjs api callback handler
 * @returns function with req, res parameters
 */
const withCookies = (handler, { options = userCookiesOptions } = {}) => async (req, res, next) => {
  const cookies = new Cookies(req, res, options);
  return (handler(req, res, { cookies, next }));
};

export {
  withCookies,
};
