import chroma from 'chroma-js';

export const colors = {
  orange: chroma('#E67543'),
  green: chroma('#767B3A'),
  dark: chroma('#4A4B21'),
  white: chroma('white'),
  black: chroma('black'),
  gray: chroma('#818180'),
  lightBlue: chroma('#04aff1'),
  darkenLightBlue: chroma('#01ccf1'),
  darkGreen: chroma('#888a4e'),
  lightGray: chroma('#b7b7b3'),
  darkenGreen: chroma('#6d893a'),
  cream: chroma('#f4ef95'),
  creamButton: chroma('#fff9bb'),
  lightGreen: chroma('#c7b75d'),
  greenList: chroma('#99b461'),
  greenSubList: chroma('#809554'),
  greenListItem: chroma('#73ba4b'),
  greenGlow: chroma('#cadb2a'),
  greenFrame: chroma('#02b174'),
};

const palette = {
  primary: colors.green,
  secondary: '',
  accent: colors.orange,
  primaryText: colors.dark,
  invertedText: colors.white.alpha(0.9).css(),
  invertedBlack: colors.black.alpha(0.2).css(),
  dark: colors.dark,
  black: colors.black,
  neutral: colors.gray,
  white: colors.white,
  menuBackground: colors.darkGreen,
  tasksList: colors.greenList,
  tasksSubList: colors.greenSubList,
  borderListItem: colors.greenListItem,
  colors: colors,
};

export default palette;
