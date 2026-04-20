const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.status(401).json({
    message: 'Unauthorized. Please login first at /auth/github'
  });
};

const isAuthenticatedBrowser = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.redirect('/auth/github');
};

module.exports = { isAuthenticated, isAuthenticatedBrowser };