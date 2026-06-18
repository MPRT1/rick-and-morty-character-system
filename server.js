require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const passport = require('./config/passport');
const connectDB = require('./config/db');

// Import routes
const authRoutes = require('./Routes/authRoutes');
const charecterRoutes = require('./Routes/charecterRoutes');

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Passport middleware
app.use(passport.initialize());

// Serve static files for uploaded images
app.use('/uploads', express.static(path.join(__dirname, 'Uploads')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/characters', charecterRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Rick & Morty Character Management System is running!',
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err : {},
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`
╔═══════════════════════════════════════════════════════════╗
║  🚀 Rick & Morty Character Management System             ║
║  Server running on http://localhost:${PORT}                      ║
║  Environment: ${process.env.NODE_ENV || 'development'}                       ║
╚═══════════════════════════════════════════════════════════╝
  `);
});

module.exports = app;
