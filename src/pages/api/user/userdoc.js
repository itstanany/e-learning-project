import { getUserDoc, withCookies } from '../../../utils/server';

/**
 * return user document from database
 */
const handler = async (req, res, { cookies }) => {
  const userCookie = JSON.parse(cookies.get('user') || null);
  if (!userCookie) {
    res.json({ user: null });
  } else {
    const userDoc = await getUserDoc({ uid: userCookie?.uid });
    res.json({ userDoc });
  }
};

export default withCookies(handler);
