const express = require('express');
const Station = require('../models/Station');

const router = express.Router();

// Get all stations
router.get('/', async (req, res) => {
  try {
    const stations = await Station.find();
    res.json(stations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get stations by location
router.get('/nearby', async (req, res) => {
  const { lat, lng, radius } = req.query;
  try {
    const stations = await Station.find({
      location: {
        $near: {
          $geometry: { type: "Point", coordinates: [parseFloat(lng), parseFloat(lat)] },
          $maxDistance: parseFloat(radius) || 5000
        }
      }
    });
    res.json(stations);
} catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add review to station
router.post('/:id/reviews', async (req, res) => {
  const { user, rating, comment } = req.body;
  try {
    const station = await Station.findById(req.params.id);
    if (!station) return res.status(404).json({ message: 'Station not found' });

    station.reviews.push({ user, rating, comment });
    await station.save();

    res.status(201).json({ message: 'Review added successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
