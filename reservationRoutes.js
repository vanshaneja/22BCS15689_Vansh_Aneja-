const express = require('express');
const Reservation = require('../models/Reservation');

const router = express.Router();

// Create reservation
router.post('/', async (req, res) => {
  const { stationId, userId, startTime, endTime } = req.body;
  try {
    const reservation = await Reservation.create({
      stationId,
      userId,   
      startTime,
      endTime
    });
    res.status(201).json(reservation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Fetch reservations by user
router.get('/user/:userId', async (req, res) => {
  try {
    const reservations = await Reservation.find({ userId: req.params.userId }).populate('stationId');
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
