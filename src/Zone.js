import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './zone.css';

const Zone = () => {
  const [zoneName, setZoneName] = useState('');
  const [villeId, setVilleId] = useState('');
  const [villes, setVilles] = useState([]);
  const [zones, setZones] = useState([]);

  useEffect(() => {
    fetchVilles();
    fetchZones();
  }, []);

  const fetchVilles = async () => {
    try {
      const response = await axios.get('/api/villes/all');
      setVilles(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchZones = async () => {
    try {
      const response = await axios.get('/api/zones/all');
      setZones(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleZoneChange = (event) => {
    setZoneName(event.target.value);
  };

  const handleVilleChange = (event) => {
    setVilleId(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newZone = {
      nom: zoneName,
      ville: {
        id: villeId
      }
    };

    try {
      await axios.post('/api/zones/save', newZone);
      setZoneName('');
      setVilleId('');
      fetchZones();
      alert('Zone created successfully!');
    } catch (error) {
      console.log(error);
    }
  };

  const deleteZone = async (id) => {
    try {
      await axios.delete(`/api/zones/delete/${id}`);
      fetchZones();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="table-container">
      <h1 className="text-g font-big1 slide-in-top">Zones</h1>
      <form onSubmit={handleSubmit}>
        <div>
          
          <input type="text" className="button-search" value={zoneName} onChange={handleZoneChange} placeholder="Enter zone name" />
        </div>
        <div>
          
          <select value={villeId} className="button-search" onChange={handleVilleChange}>
            <option value="" className="button-search" disabled>Select Ville</option>
            {villes.map((ville) => (
              <option key={ville.id} value={ville.id}>{ville.nom}</option>
            ))}
          </select>
        </div>
        <button type="submit" className="button-search">Create Zone</button>
        
      </form>

      <table className="table">
        <thead>
          <tr>
            <th>num</th>
            <th>Zone Name</th>
            <th>Ville</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {zones.map((zone, index) => (
            <tr key={zone.id}>
              <td>{index + 1}</td>
              <td>{zone.nom}</td>
              <td>{zone.ville ? zone.ville.nom : ''}</td>
              <td className="action-buttons">
                <button className="edit-button">Edit</button>
                <button className="delete-button" onClick={() => deleteZone(zone.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Zone;
