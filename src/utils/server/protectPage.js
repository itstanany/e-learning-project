import { getUserCookie } from './getUserCookie';

/**
 * Check for user authentication
 * @param {function} getServerSideProps NextJs getServerSideProps function
 * @returns redirect ot auth page if user not signed in, or
 *    ... call the getServerSideProps in authenticated users.
 */
const protectPage = (getServerSideProps) => async (ctx) => {
  const userCookie = getUserCookie(ctx.req, ctx.res);
  if (!userCookie) {
    return {
      redirect: {
        destination: `${process.env.authRoute || '/auth'}?from=${ctx.resolvedUrl}`,
        permanent: false,
      },
    };
  }
  return getServerSideProps(ctx, { userCookie });
};

export {
  protectPage,
};
