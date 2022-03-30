import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { List } from '../List';
import { Car } from '../../types/car';
import { formatDetailsString } from '../../utils/format-details-string';

const mockCars: Car[] = new Array(7).map((val, index) => ({
  stockNumber: index,
  manufacturerName: String(index),
  modelName: String(index),
  color: String(index),
  mileage: { number: index, unit: 'km' },
  fuelType: 'Petrol',
  pictureUrl: '',
}));

describe('list', () => {
  it('shows placeholder if not loaded', () => {
    render(<MemoryRouter><List cars={mockCars} loaded={false} totalCarsCount={100} /></MemoryRouter>);
    expect(screen.getByTestId('placeholder')).toBeInTheDocument();
  });

  it('should display total amount of cars', () => {
    render(<MemoryRouter><List cars={mockCars} loaded totalCarsCount={100} /></MemoryRouter>);
    expect(screen.getByText('Showing 7 of 100 results')).toBeInTheDocument();
    // it should properly display every car
    mockCars.forEach((car) => {
      expect(screen.getByText(formatDetailsString(car))).toBeInTheDocument();
    });
  });

  it('it should display every car', () => {
    render(<MemoryRouter><List cars={mockCars} loaded totalCarsCount={100} /></MemoryRouter>);
    mockCars.forEach((car) => {
      expect(screen.getByText(formatDetailsString(car))).toBeInTheDocument();
    });
  });
});
