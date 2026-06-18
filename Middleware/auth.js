const passport = require('passport');


const protect = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: 'An error occurred during authentication',
        error: err.message,
      });
    }

    if (!user) {
      return res.status(401).json({
        success: false,
        message:
          info && info.message
            ? info.message
            : 'Unauthorized. Please login to access this resource.',
      });
    }

    req.user = user;
    next();
  })(req, res, next);
};

module.exports = { protect };
