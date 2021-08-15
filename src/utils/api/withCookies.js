import Cookies from 'cookies';

const keys = [process.env.COOKIE_KEY_ONE];

const withCookies = (handler) => {
  return async (req, res) => {
    const cookies = new Cookies(req, res, { keys });
    return (handler(req, res, { cookies }));
  }
}

export default withCookies;
export {
  withCookies,
}