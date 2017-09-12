const onlyWords = new RegExp('\\w+', 'ig');

export const capitalizeAllLetters = (str) => {
  const firstLetter = str.slice(0, 1).toUpperCase();
  return firstLetter.concat(str.slice(1));
};

export const capitalizeFirstLetter = (str) => {
  const firstLetter = str.slice(0, 1).toUpperCase();
  return firstLetter.concat(str.slice(1));
};

export const normalizeText = str =>
  str.match(onlyWords).join(' ');

export const normalizeAllCapLetter = str =>
  str.match(onlyWords).map(capitalizeAllLetters).join(' ');

export const normalizeFirstCapLetter = (str) => {
  const normalizePhrase = normalizeText(str);
  return capitalizeFirstLetter(normalizePhrase);
};

export default {
  capitalizeAllLetters,
  capitalizeFirstLetter,
  normalizeText,
  normalizeAllCapLetter,
  normalizeFirstCapLetter,
};
