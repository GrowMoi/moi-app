import { Dimensions, Platform, PixelRatio } from 'react-native';

const onlyWords = new RegExp('\\w+', 'ig');

export const capitalizeAllLetters = (str) => {
  const firstLetter = str.slice(0, 1).toUpperCase();
  return firstLetter.concat(str.slice(1).toLowerCase());
};

export const capitalizeFirstLetter = (str) => {
  const firstLetter = str.slice(0, 1).toUpperCase();
  return firstLetter.concat(str.slice(1).toLowerCase());
};

export const normalizeText = str =>
  (str.match(onlyWords) || []).join(' ');

export const normalizeAllCapLetter = str =>
  str.match(onlyWords).map(capitalizeAllLetters).join(' ');

export const normalizeFirstCapLetter = (str) => {
  const normalizePhrase = normalizeText(str);
  return capitalizeFirstLetter(normalizePhrase);
};

const {
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
} = Dimensions.get('window');

// based on iphone 5s's scale
const scale = SCREEN_WIDTH / 320;

export const normalizePixelRatio = (size) => {
  const newSize = size * scale
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize))
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2
  }
}

export default {
  capitalizeAllLetters,
  capitalizeFirstLetter,
  normalizeText,
  normalizeAllCapLetter,
  normalizeFirstCapLetter,
  normalizePixelRatio,
};
