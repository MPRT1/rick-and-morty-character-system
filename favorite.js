const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide a user ID'],
    },
    character: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Character',
      required: [true, 'Please provide a character ID'],
    },
    addedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// Index to prevent duplicate favorites from same user for same character
favoriteSchema.index({ user: 1, character: 1 }, { unique: true });

module.exports = mongoose.model('Favorite', favoriteSchema);
