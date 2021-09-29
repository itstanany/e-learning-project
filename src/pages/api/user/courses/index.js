import nc from 'next-connect';
import { getAllcourses } from '../../../../utils/server';
import { requireAuth } from '../../../../utils/server/middlewares';

const handler = nc();
handler.use(requireAuth);

handler.use(async (req, res) => {
  try {
    const { body: { user } } = req;
    const courses = await getAllcourses({ uid: user.uid });
    return res.json({ courses });
  } catch (error) {
    return res.status(500).json({ error });
  }
});

export default handler;
