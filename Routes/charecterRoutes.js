const express = require('express');
const router = express.Router();
const { protect } = require('../Middleware/auth');
const Character = require('../Models/charecter');

// Get All Characters
router.get('/', async (req, res) => {
  try {
    const characters = await Character.find()
      .populate('createdBy', 'username email')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: characters.length,
      data: characters,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching characters',
      error: error.message,
    });
  }
});

// Get Single Character
router.get('/:id', async (req, res) => {
  try {
    const character = await Character.findById(req.params.id).populate(
      'createdBy',
      'username email'
    );

    if (!character) {
      return res.status(404).json({
        success: false,
        message: 'Character not found',
      });
    }

    res.status(200).json({
      success: true,
      data: character,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching character',
      error: error.message,
    });
  }
});

// Create Character
router.post('/', protect, async (req, res) => {
  try {
    const {
      name,
      species,
      status,
      gender,
      origin,
      location,
      description,
      imageUrl,
    } = req.body;

    if (!name || !species || !origin || !location) {
      return res.status(400).json({
        success: false,
        message:
          'Please provide all required fields: name, species, origin, location',
      });
    }

    const character = await Character.create({
      name,
      species,
      status: status || 'Unknown',
      gender: gender || 'Unknown',
      origin,
      location,
      description: description || '',
      imageUrl: imageUrl || '',
      createdBy: req.user._id,
    });

    await character.populate('createdBy', 'username email');

    res.status(201).json({
      success: true,
      message: 'Character created successfully!',
      data: character,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating character',
      error: error.message,
    });
  }
});

// Update Character
router.put('/:id', protect, async (req, res) => {
  try {
    let character = await Character.findById(req.params.id);

    if (!character) {
      return res.status(404).json({
        success: false,
        message: 'Character not found',
      });
    }

    if (character.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this character',
      });
    }

    character.name = req.body.name || character.name;
    character.species = req.body.species || character.species;
    character.status = req.body.status || character.status;
    character.gender = req.body.gender || character.gender;
    character.origin = req.body.origin || character.origin;
    character.location = req.body.location || character.location;
    character.description = req.body.description || character.description;
    character.imageUrl = req.body.imageUrl || character.imageUrl;

    character = await character.save();
    await character.populate('createdBy', 'username email');

    res.status(200).json({
      success: true,
      message: 'Character updated successfully!',
      data: character,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating character',
      error: error.message,
    });
  }
});

// Delete Character
router.delete('/:id', protect, async (req, res) => {
  try {
    const character = await Character.findById(req.params.id);

    if (!character) {
      return res.status(404).json({
        success: false,
        message: 'Character not found',
      });
    }

    if (character.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this character',
      });
    }

    await Character.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Character deleted successfully!',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting character',
      error: error.message,
    });
  }
});

// Get Current User Characters
router.get('/user/my-characters', protect, async (req, res) => {
  try {
    const characters = await Character.find({
      createdBy: req.user._id,
    })
      .populate('createdBy', 'username email')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: characters.length,
      data: characters,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching your characters',
      error: error.message,
    });
  }
});

module.exports = router;
