import React, { useState } from 'react';
import axios from 'axios';

const ReservationForm = ({ stationId }) => {
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [message, setMessage] = useState('');

  const handleReserve = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/reservations', {
        stationId,
        userId: 'user123', // Replace with dynamic user ID after authentication implementation
        startTime,
        endTime
      });
      setMessage('Reservation successful!');
    } catch (error) {
      setMessage('Error in reservation.');
    }
  };

  return (
    <div>
      <h3>Reserve Charging Slot</h3>
      <input
        type="datetime-local"
        value={startTime}
        onChange={(e) => setStartTime(e.target.value)}
        placeholder="Start Time"
      />
      <input
        type="datetime-local"
        value={endTime}
        onChange={(e) => setEndTime(e.target.value)}
        placeholder="End Time"
      />
      <button onClick={handleReserve}>Reserve</button>
      {message && <p>{message}</p>}
    </div>
  );
};
