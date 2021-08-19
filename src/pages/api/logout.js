import { withCookies } from '../../utils/api/withCookies';
import { userCookiesOptions } from '../../utils/common/userCookiesOptions';

const handler = async (req, res, { cookies }) => {
  cookies.set('user', undefined, userCookiesOptions);
  res.end();
};

export default withCookies(handler);
