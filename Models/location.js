const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a location name'],
      trim: true,
      unique: true,
    },
    type: {
      type: String,
      enum: ['Planet', 'Dimension', 'Location', 'Building', 'Other'],
      default: 'Location',
    },
    dimension: {
      type: String,
      required: [true, 'Please provide a dimension'],
    },
    description: {
      type: String,
      maxlength: [1500, 'Description cannot exceed 1500 characters'],
    },
    residents: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Character',
      },
    ],
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

module.exports = mongoose.model('Location', locationSchema);
