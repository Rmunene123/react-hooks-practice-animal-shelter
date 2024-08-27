import React from 'react';

function Pet({ pet = {}, onAdoptPet = () => {} }) {
  // Destructure properties from the pet object
  const {
    id = '',
    name = '',
    type = '',
    age = '',
    weight = '',
    gender = 'male',
    isAdopted = false,
  } = pet;

  // Determine the gender icon
  const genderIcon = gender === 'male' ? '♂' : '♀';

  // Handler for button click
  const handleClick = () => {
    if (!isAdopted) {
      onAdoptPet(id);
    }
  };

  return (
    <div className="card" data-testid="pet">
      <div className="content">
        <span className="header">
          {name} {genderIcon}
        </span>
        <div className="meta">
          <span className="date">{type}</span>
        </div>
        <div className="description">
          <p>Age: {age} years</p>
          <p>Weight: {weight} kg</p>
        </div>
      </div>
      <div className="extra content">
        {isAdopted ? (
          <button className="ui disabled button">Already adopted</button>
        ) : (
          <button className="ui primary button" onClick={handleClick}>
            Adopt pet
          </button>
        )}
      </div>
    </div>
  );
}

export default Pet;
