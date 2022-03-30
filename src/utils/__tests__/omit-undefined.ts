import { omitUndefined } from '../omit-undefined';

describe('omit undefined', () => {
  it('omits all undefined keys', () => {
    expect(omitUndefined({
      a: 1,
      b: undefined,
      c: {},
      e: undefined,
    })).toEqual({
      a: 1,
      c: {},
    });
  });

  it('keeps all null keys', () => {
    expect(omitUndefined({ a: null })).toEqual({ a: null });
  });
});
