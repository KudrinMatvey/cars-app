import { render, screen } from '@testing-library/react';
import { Card } from './Card';

describe('card component', () => {
  test('show placeholder if car is null', () => {
    render(<Card car={null} />);
    expect(screen.getByTestId('placeholder')).toBeInTheDocument();
  });
});
