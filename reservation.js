const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  stationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Station', required: true },
  userId: { type: String, required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  status: { type: String, enum: ['reserved', 'completed', 'cancelled'], default: 'reserved' },
  paymentStatus: { type: String, enum: ['pending', 'paid'], default: 'pending' }
}, {
  timestamps: true
});

module.exports = mongoose.model('Reservation', reservationSchema);
