const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema(
  {
    character: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Character',
      required: [true, 'Please provide a character ID'],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide a user ID'],
    },
    rating: {
      type: Number,
      required: [true, 'Please provide a rating'],
      min: [1, 'Rating must be at least 1'],
      max: [5, 'Rating cannot exceed 5'],
    },
    review: {
      type: String,
      maxlength: [1000, 'Review cannot exceed 1000 characters'],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);


ratingSchema.index({ character: 1, user: 1 }, { unique: true });

module.exports = mongoose.model('Rating', ratingSchema);
