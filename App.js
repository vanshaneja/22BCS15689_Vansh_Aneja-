import React, { useState, useEffect } from 'react';
import GoogleMapReact from 'google-map-react';
import axios from 'axios';

const Marker = ({ text }) => <div style={{ color: 'red' }}>{text}</div>;

function App() {
  const [stations, setStations] = useState([]);
  const [userLocation, setUserLocation] = useState({ lat: 0, lng: 0 });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => setUserLocation({ lat: coords.latitude, lng: coords.longitude }),
      () => alert('Location access denied')
    );
  }, []);

  useEffect(() => {
    const fetchStations = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/stations/nearby', {
          params: {
            lat: userLocation.lat,
            lng: userLocation.lng,
            radius: 5000
          }
        });
        setStations(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    if (userLocation.lat && userLocation.lng) fetchStations();
  }, [userLocation]);

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
        center={userLocation}
        defaultZoom={14}
      >
        {stations.map((station, index) => (
          <Marker
            key={index}
            lat={station.location.coordinates[1]}
            lng={station.location.coordinates[0]}
            text={station.name}
          />
        ))}
      </GoogleMapReact>
    </div>
  );
}

export default App;
