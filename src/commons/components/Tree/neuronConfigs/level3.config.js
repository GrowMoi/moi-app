// Branches level 3
import branch004 from '../../../../../assets/images/tree/arbol_adulto/nivel_3/fondo-rama004.png';
import branch002 from '../../../../../assets/images/tree/arbol_adulto/nivel_3/fondo-rama002.png';
import branch001 from '../../../../../assets/images/tree/arbol_adulto/nivel_3/fondo001.png';
import branch079 from '../../../../../assets/images/tree/arbol_adulto/nivel_3/fondo-rama079.png';
import branch080 from '../../../../../assets/images/tree/arbol_adulto/nivel_3/fondo-rama080.png';
import branch033 from '../../../../../assets/images/tree/arbol_adulto/nivel_3/fondo-rama033.png';
import branch060 from '../../../../../assets/images/tree/arbol_adulto/nivel_3/fondo060.png';
import branch003 from '../../../../../assets/images/tree/arbol_adulto/nivel_3/fondo003.png';
import branch032 from '../../../../../assets/images/tree/arbol_adulto/nivel_3/fondo032.png';
import branch081 from '../../../../../assets/images/tree/arbol_adulto/nivel_3/fondo081.png';

// Branches level 4
import branch031 from '../../../../../assets/images/tree/arbol_adulto/nivel_4/fondo-rama031.png';
import branch082 from '../../../../../assets/images/tree/arbol_adulto/nivel_4/fondo082.png';
import branch005 from '../../../../../assets/images/tree/arbol_adulto/nivel_4/fondo-rama005.png';
import branch007 from '../../../../../assets/images/tree/arbol_adulto/nivel_4/fondo007.png';
import branch006 from '../../../../../assets/images/tree/arbol_adulto/nivel_4/fondo-rama006.png';
import branch034 from '../../../../../assets/images/tree/arbol_adulto/nivel_4/fondo-rama034.png';
import branch061 from '../../../../../assets/images/tree/arbol_adulto/nivel_4/fondo-rama061.png';
import branch085 from '../../../../../assets/images/tree/arbol_adulto/nivel_4/fondo085.png';
import branch087 from '../../../../../assets/images/tree/arbol_adulto/nivel_4/fondo-rama087.png';
import branch083 from '../../../../../assets/images/tree/arbol_adulto/nivel_4/fondo-rama083.png';
import branch084 from '../../../../../assets/images/tree/arbol_adulto/nivel_4/fondo-rama084.png';
import branch086 from '../../../../../assets/images/tree/arbol_adulto/nivel_4/fondo-rama086.png';

export default {
  left: {
    neuron: {
      color: 'blue',
    },
    level3: {
      0: {
        position: { right: 40, bottom: 10 },
        floweredImg: [branch002, branch004],
        children: {
          0: {
            position: { right: 36, bottom: 4 },
            floweredImg: [],
          },
          1: {
            position: { right: 70, top: 5 },
            floweredImg: [branch006, branch007],
          },
          2: {
            position: { right: 62, bottom: 25 },
            floweredImg: [branch005, branch003],
          },
        },
      },
    },
  },

  leftCenter: {
    neuron: {
      color: 'green',
    },
    level3: {
      0: {
        position: { right: 37, bottom: 28 },
        floweredImg: [branch033],
        children: {
          0: {
            position: { right: 12, bottom: 23 },
            floweredImg: [branch032, branch034],
          },
          1: {
            position: { right: 9, bottom: 52 },
            floweredImg: [branch032, branch034],
          },
          2: {
            position: { left: 20, bottom: 37 },
            floweredImg: [branch032, branch034],
          },
        },
      },
      1: {
        position: { left: 1, bottom: 36 },
        floweredImg: [branch001, branch031],
        children: {
          0: {
            position: { left: 30, bottom: 8 },
            floweredImg: [branch061],
          },
        },
      },
    },
  },

  rightCenter: {
    neuron: {
      color: 'yellow',
    },
    level3: {
      0: {
        position: { left: 28, bottom: 19 },
        floweredImg: [branch060],
        children: {
          0: {
            position: { left: 24, bottom: 32 },
            floweredImg: [branch061],
          },
          1: {
            position: { left: 47, bottom: 55 },
            floweredImg: [branch061],
          },
        },
      },
    },
  },

  right: {
    neuron: {
      color: 'fuchsia',
    },
    level3: {
      0: {
        position: { left: 67, bottom: 31 },
        floweredImg: [branch082, branch079, branch080],
        children: {
          0: {
            position: { left: 7, bottom: 40 },
            floweredImg: [branch083],
          },
          1: {
            position: { left: 78, bottom: 16 },
            floweredImg: [branch086],
          },
        },
      },
      1: {
        position: { left: 55, top: 2 },
        floweredImg: [branch081],
        children: {
          0: {
            position: { left: 41, bottom: 4 },
            floweredImg: [],
          },
          1: {
            position: { left: 57, bottom: 27 },
            floweredImg: [branch084],
          },
          2: {
            position: { left: 84, top: 10 },
            floweredImg: [branch085],
          },
          3: {
            position: { left: 82, bottom: 20 },
            floweredImg: [branch085],
          },
          4: {
            position: { left: 123, bottom: 34 },
            floweredImg: [branch087],
          },
        },
      },
    },
  },
};
