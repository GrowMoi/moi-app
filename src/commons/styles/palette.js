import chroma from 'chroma-js';

const colors = {
  orange: chroma('#E67543'),
  green: chroma('#767B3A'),
  dark: chroma('#4A4B21'),
  white: chroma('white'),
  black: chroma('black'),
  gray: chroma('#818180'),
};

const palette = {
  primary: colors.green,
  secondary: '',
  accent: colors.orange,
  primaryText: colors.dark,
  invertedText: colors.white.alpha(0.9).css(),
  dark: colors.dark,
  black: colors.black,
  neutral: colors.neutral,
};

export default palette;
