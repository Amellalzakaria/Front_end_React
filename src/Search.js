import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { GoogleMap, Marker, LoadScript, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';
import './App.css';

const Search = () => {
  const [villes, setVilles] = useState([]);
  const [zones, setZones] = useState([]);
  const [selectedVille, setSelectedVille] = useState('');
  const [selectedZone, setSelectedZone] = useState('');
  const [pharmacies, setPharmacies] = useState([]);
  const [selectedPharmacy, setSelectedPharmacy] = useState(null);
  const [selectedPharmacyPosition, setSelectedPharmacyPosition] = useState(null);
  const [directions, setDirections] = useState(null);
  const [pharmacyPhotos, setPharmacyPhotos] = useState([]);
  const [currentPosition, setCurrentPosition] = useState(null);

  useEffect(() => {
    fetchVilles();
    fetchCurrentPosition(); // Get the user's current position
  }, []);

  useEffect(() => {
    if (selectedVille) {
      fetchZonesByVille();
    }
  }, [selectedVille]);

  const fetchVilles = async () => {
    try {
      const response = await axios.get('/api/villes/all');
      setVilles(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchZonesByVille = async () => {
    try {
      const response = await axios.get(`/api/villes/${selectedVille}/zones`);
      setZones(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const searchPharmacies = async () => {
    try {
      const response = await axios.get(`/api/pharmacies/byZone/${selectedZone}`);
      setPharmacies(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchPharmacyPhotos = async (pharmacyId) => {
    try {
      const response = await axios.get(`/api/images/pharmacie/${pharmacyId}`);
      setPharmacyPhotos(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchCurrentPosition = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentPosition({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  };

  const handleVilleChange = (e) => {
    setSelectedVille(e.target.value);
    setSelectedZone('');
    setZones([]);
  };

  const handleZoneChange = (e) => {
    setSelectedZone(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedZone) {
      searchPharmacies();
    }
  };

  const handlePharmacyClick = (pharmacy) => {
    setSelectedPharmacy(pharmacy);
    setSelectedPharmacyPosition({
      lat: parseFloat(pharmacy.latitude),
      lng: parseFloat(pharmacy.longitude),
    });
    handleRouteDirections(); // Generate route directions when a pharmacy is selected
    fetchPharmacyPhotos(pharmacy.id); // Fetch photos for the selected pharmacy
  };

  const handleRouteDirections = () => {
    if (selectedPharmacyPosition && currentPosition) {
      const directionsService = new window.google.maps.DirectionsService();
      const origin = currentPosition;

      directionsService.route(
        {
          origin: origin,
          destination: selectedPharmacyPosition,
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            setDirections(result);
          } else {
            console.error('Error fetching directions:', result);
          }
        }
      );
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-g font-big1 slide-in-top">recherche des pharmacies</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label className="text-gc font-moy slide-in-top">Ville :</label>
          <select id="ville" className=" button-search" value={selectedVille} onChange={handleVilleChange}>
            <option value="">Select Ville</option>
            {villes.map((ville) => (
              <option key={ville.id} value={ville.nom}>
                {ville.nom}
              </option>
            ))}
          </select>
        </div>
        {selectedVille && (
          <div>
            <label className="text-gc font-moy slide-in-top">Zone :</label>
            <select id="zone " className=" button-search" value={selectedZone} onChange={handleZoneChange}>
              <option value="">Select Zone</option>
              {zones.map((zone) => (
                <option key={zone.id} value={zone.id}>
                  {zone.nom}
                </option>
              ))}
            </select>
          </div>
        )}
        <button className=" text-decoration-none button-search rounded" disabled={!selectedZone}>
          Search
        </button>
      </form>

      {pharmacies.length > 0 && (
        <div>
          <h3 className="font-ss">Pharmacies :</h3>
          <ul className="pharmacy-list">
            {pharmacies.map((pharmacie) => (
              <li key={pharmacie.id}>
                <button className=" button-search1" onClick={() => handlePharmacyClick(pharmacie)}>{pharmacie.nom}</button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {selectedPharmacy && (
        <div>
          <h3 className="font-ss">La pharmacie choisie: {selectedPharmacy.nom}</h3>
          <h4 className="font-ss">La photo de la pharmacie:</h4>
          <ul>
            {pharmacyPhotos.map((photo) => (
              
              <li key={photo.id}>
                <img src={photo.url} alt={`Photo ${photo.id}`} />
              </li>
            ))}
          </ul>
        </div>
      )}

      <div>
        <h3 className="font-ss">La localisation de la pharmacie :</h3>
        <LoadScript googleMapsApiKey="AIzaSyB5elPgCtl5JlcrQBgMQxWUFjnI7eUYZ7U">
          <GoogleMap
            center={selectedPharmacyPosition || { lat: 0, lng: 0 }}
            zoom={12}
            mapContainerStyle={{ height: '400px', width: '100%' }}
          >
            {/* Display markers for pharmacies */}
            {pharmacies.map((pharmacy) => (
              <Marker
                key={pharmacy.id}
                position={{ lat: parseFloat(pharmacy.latitude), lng: parseFloat(pharmacy.longitude) }}
                onClick={() => handlePharmacyClick(pharmacy)}
              />
            ))}

            {/* Display directions if available */}
            {directions && <DirectionsRenderer directions={directions} />}
          </GoogleMap>
        </LoadScript>
      </div>
    </div>
  );
};

export default Search;
