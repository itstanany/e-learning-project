import { getUserCookie } from './getUserCookie';

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
