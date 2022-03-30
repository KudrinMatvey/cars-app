/**
 * @param word - string
 * @return word but with 1st letter capitalized
 */
export function capitalize(word: string): string {
  if(!word) return word;
  return word[0].toUpperCase() + word.slice(1);
}