import React, { useState, useEffect } from 'react';
import PetBrowser from './PetBrowser';

function App() {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPets();
  }, []);

  const fetchPets = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/pets');
      const petsData = await response.json();
      setPets(petsData);
    } catch (error) {
      console.error('Error fetching pets:', error);
    } finally {
      setLoading(false);
    }
  };

  const adoptPet = (petId) => {
    setPets((prevPets) =>
      prevPets.map((pet) =>
        pet.id === petId ? { ...pet, isAdopted: true } : pet
      )
    );
  };

  return (
    <div className="App">
      <h1>Pet Adoption</h1>
      <button onClick={fetchPets} disabled={loading}>
        {loading ? 'Loading...' : 'Fetch Pets'}
      </button>
      <PetBrowser pets={pets} onAdoptPet={adoptPet} />
    </div>
  );
}

export default App;
