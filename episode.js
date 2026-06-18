const mongoose = require('mongoose');

const episodeSchema = new mongoose.Schema(
  {
    episodeName: {
      type: String,
      required: [true, 'Please provide an episode name'],
      trim: true,
    },
    season: {
      type: Number,
      required: [true, 'Please provide a season number'],
      min: 1,
    },
    episode: {
      type: Number,
      required: [true, 'Please provide an episode number'],
      min: 1,
    },
    airDate: {
      type: Date,
      required: [true, 'Please provide an air date'],
    },
    description: {
      type: String,
      maxlength: [2000, 'Description cannot exceed 2000 characters'],
    },
    characters: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Character',
      },
    ],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Episode', episodeSchema);
