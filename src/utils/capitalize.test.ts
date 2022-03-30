import { capitalize } from './capitalize';

describe('capitalize', () => {
  it('capitalizes a non-empty word', () => {
    expect(capitalize('test')).toBe('Test');
  });

  it('handles an empty string properly', () => {
    expect(capitalize('')).toBe('');
  });

  it('doesn`t throw on null', () => {
    expect(capitalize(null as unknown as string)).toBe(null);
  });
});
