import { getUserCookie } from './getUserCookie';

const isAuth = (req, res) => {
  const userCookie = getUserCookie(req, res);
  if (userCookie) return true;
  return false;
};

export {
  isAuth,
};
