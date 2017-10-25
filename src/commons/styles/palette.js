import chroma from 'chroma-js';

export const colors = {
  orange: chroma('#E67543'),
  green: chroma('#767B3A'),
  dark: chroma('#4A4B21'),
  white: chroma('white'),
  black: chroma('black'),
  gray: chroma('#818180'),
  darkGreen: chroma('#888a4e'),
  lightGray: chroma('#b7b7b3'),
  darkenGreen: chroma('#6d893a'),
  cream: chroma('#f4ef95'),
  lightGreen: chroma('#c7b75d'),
};

const palette = {
  primary: colors.green,
  secondary: '',
  accent: colors.orange,
  primaryText: colors.dark,
  invertedText: colors.white.alpha(0.9).css(),
  dark: colors.dark,
  black: colors.black,
  neutral: colors.gray,
  white: colors.white,
  menuBackground: colors.darkGreen,
};

export default palette;
