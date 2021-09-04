import Cookies from 'cookies';
import { cookieKeys } from '../api/cookiesKeys';

const protectPage = (getServerSideProps) => async (ctx) => {
  const { req, res } = ctx;
  const cookies = new Cookies(req, res, { keys: cookieKeys });
  const userCookies = cookies.get('user', { signed: true });
  if (!userCookies) {
    return {
      redirect: {
        destination: `${process.env.authRoute || '/auth'}?from=${ctx.resolvedUrl}`,
        permanent: false,
      },
    };
  }
  return getServerSideProps(ctx);
};

export {
  protectPage,
};
