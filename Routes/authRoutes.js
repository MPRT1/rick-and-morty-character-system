const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../Models/user');

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'your-secret-key-change-this', {
    expiresIn: '7d',
  });
};


router.post('/register', async (req, res) => {
  try {
    const { username, email, password, confirmPassword } = req.body;

    
    if (!username || !email || !password || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields.',
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: 'Passwords do not match.',
      });
    }

    // Check if user already exists
    let user = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (user) {
      return res.status(400).json({
        success: false,
        message:
          user.email === email
            ? 'Email already registered.'
            : 'Username already taken.',
      });
    }

    
    user = await User.create({
      username,
      email,
      password,
    });

    
    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      message: 'User registered successfully!',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error during registration',
      error: error.message,
    });
  }
});


router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    try {
      if (err) {
        return res.status(500).json({
          success: false,
          message: 'An error occurred during login',
          error: err.message,
        });
      }

      if (!user) {
        return res.status(401).json({
          success: false,
          message: info.message || 'Login failed',
        });
      }

      // Generate token
      const token = generateToken(user._id);

      res.status(200).json({
        success: true,
        message: 'Login successful!',
        token,
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
        },
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'An error occurred',
        error: error.message,
      });
    }
  })(req, res, next);
});


router.get('/me', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.status(200).json({
    success: true,
    user: {
      id: req.user._id,
      username: req.user.username,
      email: req.user.email,
    },
  });
});

module.exports = router;
