const passport = require('passport');

const ensureAuthenticated = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user) => {
    if (user) {
      req.user = user;
      return next();
    }
    res.status(401).json({ message: 'Unauthorized' });
  })(req, res, next);
};

module.exports = ensureAuthenticated;
