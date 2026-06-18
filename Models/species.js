const mongoose = require('mongoose');

const speciesSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a species name'],
      trim: true,
      unique: true,
    },
    description: {
      type: String,
      maxlength: [1000, 'Description cannot exceed 1000 characters'],
    },
    characteristics: {
      type: String,
      maxlength: [500, 'Characteristics cannot exceed 500 characters'],
    },
    knownMembers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Character',
      },
    ],
    homeworld: {
      type: String,
      default: null,
    },
    image: {
      type: String,
      default: null,
    },
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

module.exports = mongoose.model('Species', speciesSchema);
