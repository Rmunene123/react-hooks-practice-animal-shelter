import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from '../components/App'; 
import '@testing-library/jest-dom/extend-expect';

test('Adopting pets should set a pet\'s adopted status to true', async () => {
  render(<App />);

  // Click the "Find pets" button
  fireEvent.click(screen.getByText(/Find pets/));

  const buttons = await screen.findAllByText(/Adopt Pet/);
  const button = buttons[0];

  fireEvent.click(button);

  // Check if the button text changes to "Already Adopted"
  await waitFor(() => expect(button).toHaveTextContent('Already Adopted'));
});