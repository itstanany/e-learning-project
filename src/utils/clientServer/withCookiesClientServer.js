import Cookies from 'cookies';
import { cookieKeys } from '../common/cookiesKeys';

const withCookiesClientServer = (ssrFunction) => (ctx) => {
  const cookies = new Cookies(ctx.req, ctx.res, { keys: cookieKeys });
  return ssrFunction(ctx, { cookies });
};

export {
  withCookiesClientServer,
};
