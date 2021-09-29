import nc from 'next-connect';
import { getResources } from '../../../../../../../utils/server';
import { requireAuth, requireSubscription } from '../../../../../../../utils/server/middlewares';

/**
 * return all courses in the database *** will refactored with pagination soon.
 * @param {*} req NextJs request object
 * @param {*} res NextJs response object
 */

const handler = nc();
handler.use(requireAuth);
handler.use(requireSubscription);

handler.use(async (req, res) => {
  const { body, body: { cId, lId } } = req;
  console.log({ body });
  const resources = await getResources({ cId, lId });
  console.log({ resources });
  res.json({ resources });
});

export default handler;

// export {
//   getAllcourses,
// };
