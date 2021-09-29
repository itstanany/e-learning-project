import { withCookies } from '..';
import { jwtVerify } from '../jwt';

const checkAuth = (req, res, { cookies, next }) => {
  const userCookie = cookies.get('user');
  try {
    const user = jwtVerify({ token: userCookie });
    // avoid empty string req.body
    req.body = {
      ...req.body,
      user,
      // rename user to userCookie,
      //  ... so avoid the possibility of "user" field in body ibject send by the client
      userCookie: user,
    };
    next();
  } catch (error) {
    console.log('requireAuth error');
    console.log({ error });
    res.status(401).json({ error: 'not authenticated' });
  }
};

const requireAuth = withCookies(checkAuth);

export {
  requireAuth,
};
