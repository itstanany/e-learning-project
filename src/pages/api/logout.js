import { withCookies } from '../../utils/api/withCookies';
import { userCookiesOptions } from '../../utils/api/useCookiesOptions';

const handler = async (req, res, { cookies }) => {
  cookies.set('user', undefined, userCookiesOptions);
  res.end();
};

export default withCookies(handler);
