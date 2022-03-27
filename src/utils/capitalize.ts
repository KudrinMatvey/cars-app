/**
 * @param str - string
 * @return str but with 1st letter capitalized
 */
export function capitalize(str: string): string {
  if(!str) return str;
  return str[0].toUpperCase() + str.slice(1);
}