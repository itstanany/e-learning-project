// todo, recover api
import nc from 'next-connect';
import { requireAdminRole, requireAuth } from '../../../../utils/server/middlewares';
import { deleteCourses } from '../../../../utils/server/controllers';

const handler = nc();
handler.use(requireAuth);
handler.use(requireAdminRole);
handler.use(deleteCourses);
export default handler;
