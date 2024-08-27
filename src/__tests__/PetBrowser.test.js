import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import PetBrowser from '../components/PetBrowser'; // Ensure the path is correct

const testPets = [
  {
    id: '5c142d9e-ea45-4231-8146-cccf71c704c0',
    type: 'dog',
    gender: 'male',
    age: 4,
    weight: 1,
    name: 'Trident',
    isAdopted: false,
  },
  {
    id: '2c902312-dfa3-446f-8b4b-5e115170d807',
    type: 'cat',
    gender: 'male',
    age: 3,
    weight: 1,
    name: 'Teddy',
    isAdopted: false,
  },
  {
    id: '6057de4f-6725-4b9f-a0b1-1f3bd3ad04a6',
    type: 'cat',
    gender: 'male',
    age: 2,
    weight: 5,
    name: 'Hemingway',
    isAdopted: false,
  },
];

test('renders Pet components based on its props', () => {
  render(<PetBrowser pets={testPets} onAdoptPet={() => {}} />);

  testPets.forEach(pet => {
    // Adjusting the query to handle the possibility of text being split or styled differently
    expect(screen.getByText(new RegExp(pet.name, 'i'))).toBeInTheDocument();
  });
});

test('passes an `onAdoptPet` callback prop to its children Pet components', () => {
  const onAdoptPet = jest.fn();
  render(<PetBrowser pets={testPets} onAdoptPet={onAdoptPet} />);

  // Find the button element that triggers adoption. The query might need to be adjusted if there's more than one button or different text.
  const buttons = screen.getAllByText(/Adopt Pet/i);
  
  // Ensure we have at least one button before clicking
  expect(buttons.length).toBeGreaterThan(0);

  fireEvent.click(buttons[0]);

  // Check that the callback has been called with the correct pet id
  expect(onAdoptPet).toHaveBeenCalledWith(testPets[0].id);
});
