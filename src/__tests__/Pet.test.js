import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Pet from '../components/Pet';

const MALE_DOG = {
  id: '1',
  name: 'Rover',
  type: 'dog',
  age: 4,
  weight: 12,
  gender: 'male',
  isAdopted: false,
};

const FEMALE_CAT = {
  id: '2',
  name: 'Whiskers',
  type: 'cat',
  age: 2,
  weight: 8,
  gender: 'female',
  isAdopted: true,
};

test('renders the pet details', () => {
  render(<Pet pet={MALE_DOG} onAdoptPet={() => {}} />);
  expect(screen.getByText(`${MALE_DOG.name} ♂`)).toBeInTheDocument();
  expect(screen.getByText(MALE_DOG.type)).toBeInTheDocument();
  expect(screen.getByText(`Age: ${MALE_DOG.age} years`)).toBeInTheDocument();
  expect(screen.getByText(`Weight: ${MALE_DOG.weight} kg`)).toBeInTheDocument();
});

test('renders the correct gender icon for female pets', () => {
  render(<Pet pet={FEMALE_CAT} onAdoptPet={() => {}} />);
  expect(screen.getByText(`${FEMALE_CAT.name} ♀`)).toBeInTheDocument();
  expect(screen.queryByText('♂')).not.toBeInTheDocument();
});

test('shows adopt button when pet is not adopted', () => {
  render(<Pet pet={MALE_DOG} onAdoptPet={() => {}} />);
  expect(screen.getByText(/Adopt pet/i)).toBeInTheDocument();
  expect(screen.queryByText(/Already adopted/i)).not.toBeInTheDocument();
});

test('shows already adopted button when pet is adopted', () => {
  render(<Pet pet={FEMALE_CAT} onAdoptPet={() => {}} />);
  expect(screen.getByText(/Already adopted/i)).toBeInTheDocument();
  expect(screen.queryByText(/Adopt pet/i)).not.toBeInTheDocument();
});
