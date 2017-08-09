export default {
  museo(font) {
    if (font === 'lighter') return 'Museo100';
    else if (font === 'normal') return 'Museo300';
    else if (font === 'bolder') return 'Museo500';
    else if (font === 'heavy') return 'Museo700';
    else if (font === 'book') return 'Museo900';
    return 'Museo300';
  },

  futura(font) {
    if (font === 'normal') return 'Futura';
    else if (font === 'bolder') return 'FuturaBold';
    else if (font === 'heavy') return 'FuturaHeavy';
    else if (font === 'condensed') return 'FuturaCondensed';
    return 'Futura';
  },

  noodle(font) {
    if (font === 'normal') return 'Noodle';
    else if (font === 'italic') return 'NoodleItalic';
    return 'Noodle';
  },
};

