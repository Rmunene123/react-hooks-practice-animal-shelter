import React from 'react';

function PetBrowser({ pets, onAdoptPet }) {
  return (
    <div className="ui cards">
      {pets.map((pet) => (
        <div key={pet.id} className="card" data-testid="pet">
          <div className="content">
            <span className="header">
              {pet.name} {pet.gender === 'male' ? '♂' : '♀'}
            </span>
            <div className="meta">
              <span className="date">{pet.type}</span>
            </div>
            <div className="description">
              <p>Age: {pet.age} years</p>
              <p>Weight: {pet.weight} kg</p>
            </div>
          </div>
          <div className="extra content">
            <button
              className="ui primary button"
              onClick={() => onAdoptPet(pet.id)}
              disabled={pet.isAdopted}
            >
              {pet.isAdopted ? 'Already Adopted' : 'Adopt Pet'}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PetBrowser;
