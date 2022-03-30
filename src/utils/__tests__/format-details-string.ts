import { formatDetailsString } from '../format-details-string';
import { Car } from '../../types/car';

describe('format details string', () => {
  it('returns proper string if all fields are present', () => {
    const formatted = formatDetailsString({
      color: 'yellow',
      fuelType: 'Diesel',
      mileage: { number: 100, unit: 'km' },
      stockNumber: 0,
    } as Car);
    expect(formatted).toBe('Stock # 0 - 100 KM - Diesel - Yellow');
  });

  it('returns an empty string if an empty car is passed', () => {
    const formatted = formatDetailsString({} as Car);
    expect(formatted).toBe('');
  });

  it('returns an empty string if no car is passed', () => {
    const formatted = formatDetailsString();
    expect(formatted).toBe('');
  });

  it('returns a formatted string if some fields are missing', () => {
    const formatted = formatDetailsString({
      color: 'pink',
      fuelType: 'Diesel',
    } as Car);
    expect(formatted).toBe('Diesel - Pink');
  });
});
