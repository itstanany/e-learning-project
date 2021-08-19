const adminEditorAccess = (handler) => (ctx, { userCookie }) => {
  if (userCookie.role === 'admin' || userCookie.role === 'editor') {
    return handler(ctx, { userCookie });
  }
  return {
    redirect: {
      destination: `/accessdenied?from=${ctx.resolvedUrl}`,
      permanent: false,
    },
  };
};

export {
  adminEditorAccess,
};
