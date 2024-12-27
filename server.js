const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

const stationRoutes = require('./routes/stationRoutes');
const reservationRoutes = require('./routes/reservationRoutes');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('Database connection error:', err));

// Routes
app.use('/api/stations', stationRoutes);
app.use('/api/reservations', reservationRoutes);

// Start Server
app.listen(PORT, () => console.log());
