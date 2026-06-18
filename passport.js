const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const User = require('../Models/user');


passport.use(
  'local',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    async (email, password, done) => {
      try {
        
        const user = await User.findOne({ email }).select('+password');

        if (!user) {
          return done(null, false, {
            message: 'User not found. Please register first.',
          });
        }

        
        const isPasswordMatched = await user.matchPassword(password);

        if (!isPasswordMatched) {
          return done(null, false, {
            message: 'Invalid email or password.',
          });
        }

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);


passport.use(
  'jwt',
  new JWTStrategy(
    {
      secretOrKey: process.env.JWT_SECRET || 'your-secret-key-change-this',
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    },
    async (jwtPayload, done) => {
      try {
    
        const user = await User.findById(jwtPayload.id);

        if (user) {
          return done(null, user);
        }

        return done(null, false);
      } catch (error) {
        return done(error, false);
      }
    }
  )
);


passport.serializeUser((user, done) => {
  done(null, user.id);
});


passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

module.exports = passport;
