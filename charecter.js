const mongoose = require('mongoose');

const characterSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a character name'],
      trim: true,
    },

    species: {
      type: String,
      required: [true, 'Please provide a species'],
    },

    status: {
      type: String,
      enum: ['Alive', 'Dead', 'Unknown'],
      default: 'Unknown',
    },

    gender: {
      type: String,
      enum: ['Male', 'Female', 'Genderless', 'Unknown'],
      default: 'Unknown',
    },

    origin: {
      type: String,
      required: [true, 'Please provide an origin'],
    },

    location: {
      type: String,
      required: [true, 'Please provide a location'],
    },

    description: {
      type: String,
      maxlength: [1000, 'Description cannot exceed 1000 characters'],
      default: '',
    },

    imageUrl: {
      type: String,
      default: '',
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Character', characterSchema);