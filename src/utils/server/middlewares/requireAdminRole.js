const requireAdminRole = (req, res, next) => {
  console.log({
    ...req?.body?.userCookie,
  });
  if (req?.body?.userCookie?.role === 'admin') {
    return next();
  }
  return res.status(403).json({ error: 'not authorized, require admin' });
};

export {
  requireAdminRole,
};
