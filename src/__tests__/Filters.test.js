import { render, screen, fireEvent } from '@testing-library/react';
import Filters from '../components/Filters';

test('calls onFindPetsClick when Find pets button is clicked', () => {
  const onFindPetsClick = jest.fn();
  render(<Filters onFindPetsClick={onFindPetsClick} filters={{}} />);

  const button = screen.queryByText(/Find pets/); // No global flag needed
  fireEvent.click(button);
  expect(onFindPetsClick).toHaveBeenCalled();
});
