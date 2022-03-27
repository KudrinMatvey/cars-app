/**
 * @param obj - object
 * @return a copy of object with omitted properties that have undefined values
 */
export function omitUndefined<T extends Object>(obj: T): Partial<T> {
  const res = {...obj};
  Object.entries(res).forEach(([key, val]) => {
    if(val === undefined) {
      delete res[key as keyof T]
    }
  });
  return res;
}