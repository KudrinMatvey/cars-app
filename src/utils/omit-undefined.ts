/**
 * @param obj - object
 * @return a copy of object with omitted properties that have undefined values
 */
export function omitUndefined<T extends Object>(obj: T): Partial<T> {
  const res: Partial<T> = { };
  Object.entries(obj).forEach(([key, val]) => {
    if (val !== undefined) {
      res[key as keyof T] = val;
    }
  });
  return res;
}
