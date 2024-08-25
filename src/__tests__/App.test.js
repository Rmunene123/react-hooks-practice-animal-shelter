import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import App from '../components/App';

// Ensure fetch is mocked correctly
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve([
      { name: 'Trident', type: 'dog', age: 4, weight: 1, isAdopted: false },
      { name: 'Teddy', type: 'cat', age: 3, weight: 1, isAdopted: false },
      { name: 'Hemingway', type: 'cat', age: 2, weight: 5, isAdopted: false },
    ]),
  })
);

beforeEach(() => {
  fetch.mockClear(); // Clear any previous mock calls
});

test('fetches and displays pets', async () => {
  render(<App />);

  // Ensure the loading state is rendered
  expect(screen.getByText('Loading...')).toBeInTheDocument();

  await act(async () => {
    // Click the fetch button
    const fetchButton = screen.getByText(/Fetch Pets/i);
    fireEvent.click(fetchButton);

    // Wait for pets to be displayed
    await waitFor(() => {
      expect(screen.getByText('Trident')).toBeInTheDocument();
      expect(screen.getByText('Teddy')).toBeInTheDocument();
      expect(screen.getByText('Hemingway')).toBeInTheDocument();
    });
  });
});

test('adopts a pet when the button is clicked', async () => {
  render(<App />);

  // Mock the fetch API to simulate adoption behavior
  fetch.mockImplementationOnce(() =>
    Promise.resolve({
      json: () => Promise.resolve([
        { name: 'Trident', type: 'dog', age: 4, weight: 1, isAdopted: false },
        { name: 'Teddy', type: 'cat', age: 3, weight: 1, isAdopted: false },
        { name: 'Hemingway', type: 'cat', age: 2, weight: 5, isAdopted: false },
      ]),
    })
  );

  await act(async () => {
    const fetchButton = screen.getByText(/Fetch Pets/i);
    fireEvent.click(fetchButton);

    await waitFor(() => {
      expect(screen.getByText('Trident')).toBeInTheDocument();
    });

    // Simulate adoption
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve([
          { name: 'Trident', type: 'dog', age: 4, weight: 1, isAdopted: true },
          { name: 'Teddy', type: 'cat', age: 3, weight: 1, isAdopted: false },
          { name: 'Hemingway', type: 'cat', age: 2, weight: 5, isAdopted: false },
        ]),
      })
    );

    const adoptButton = screen.getAllByText(/Adopt pet/i)[0];
    fireEvent.click(adoptButton);

    await waitFor(() => {
      expect(screen.getByText('Trident (Adopted)')).toBeInTheDocument();
    });
  });
});
