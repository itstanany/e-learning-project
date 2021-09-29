import nc from 'next-connect';
import { getUserDoc } from '../../../utils/server';
import { requireAuth } from '../../../utils/server/middlewares';

/**
 * return user document from database
 */

const handler = nc();
handler.use(requireAuth);

handler.use(async (req, res) => {
  const { body: { user } } = req;
  const userDoc = await getUserDoc({ uid: user?.uid });
  res.json({ userDoc });
});

export default (handler);
