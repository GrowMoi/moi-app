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
  /**
   * LEFT BRANCH
   */

  left: {
    neuron: {
      color: 'blue',
    },
    level2: {
      0: {
        0: { position: { left: 123, bottom: 50 }, floweredBranches: [] },
      },
    },
    level3: {
      0: {
        0: { position: { right: 20, bottom: 1 }, floweredBranches: [branch002, branch004] },
      },
    },
    level4: {
      0: {
        0: { position: { right: 15, bottom: 7 }, floweredBranches: [] },
        1: { position: { right: 38, bottom: 13 }, floweredBranches: [branch006, branch007] },
        2: { position: { right: 40, bottom: 1 }, floweredBranches: [branch005, branch003] },
      },
    },
    level5: {
      0: {
        0: { position: { right: 1, bottom: 20 }, floweredBranches: [] },
        1: { position: { right: 4, bottom: 20 }, floweredBranches: [] },
        2: { position: { right: 4, bottom: 20 }, floweredBranches: [] },
      },
    },
  },

  /**
   * LEFT CENTER BRANCH
   */

  leftCenter: {
    neuron: {
      color: 'green',
    },
    level2: {
      0: {
        0: { position: { left: 146, bottom: 56 }, floweredBranches: [] },
      },
    },
    level3: {
      0: {
        0: { position: { right: 20, bottom: 11 }, floweredBranches: [branch033] },
        1: { position: { left: 6, bottom: 11 }, floweredBranches: [branch001, branch031] },
      },
    },
    level4: {
      0: {
        0: { position: { right: 14, bottom: 14 }, floweredBranches: [branch032, branch034] },
        1: { position: { right: 13, bottom: 27 }, floweredBranches: [branch032, branch034] },
        2: { position: { left: 3, bottom: 22 }, floweredBranches: [branch032, branch034] },
      },
      1: {
        0: { position: { right: 14, bottom: 10 }, floweredBranches: [branch061] },
      },
    },
    level5: {
      0: {
        0: { position: { right: 1, bottom: 20 }, floweredBranches: [] },
        1: { position: { right: 1, bottom: 20 }, floweredBranches: [] },
        2: { position: { right: 1, bottom: 20 }, floweredBranches: [] },
      },
    },
  },

  /**
   * RIGHT CENTER BRANCH
   */

  rightCenter: {
    neuron: {
      color: 'yellow',
    },
    level2: {
      0: {
        0: { position: { right: 153, bottom: 58 }, floweredBranches: [] },
      },
    },
    level3: {
      0: {
        0: { position: { left: 6, bottom: 13 }, floweredBranches: [branch060] },
      },
    },
    level4: {
      0: {
        0: { position: { left: 8, bottom: 10 }, floweredBranches: [branch061] },
        1: { position: { left: 25, bottom: 12 }, floweredBranches: [branch061] },
      },
    },
    level5: {
      0: {
        0: { position: { right: 1, top: -20 } },
        1: { position: { right: 1, top: -20 } },
        2: { position: { right: 1, top: -20 } },
      },
    },
  },

  /**
   * RIGHT BRANCH
   */

  right: {
    neuron: {
      color: 'fuchsia',
    },
    level2: {
      0: {
        0: { position: { right: 133, bottom: 43 }, floweredBranches: [] },
      },
    },
    level3: {
      0: {
        0: { position: { left: 22, bottom: 20 }, floweredBranches: [branch082, branch079, branch080] },
        1: { position: { left: 34, top: 1 }, floweredBranches: [branch081] },
      },
    },
    level4: {
      0: {
        0: { position: { left: 15, bottom: 13 }, floweredBranches: [branch083] },
        1: { position: { left: 32, bottom: 3 }, floweredBranches: [branch086] },
      },
      1: {
        0: { position: { left: 17, bottom: 7 }, floweredBranches: [] },
        1: { position: { left: 36, bottom: 16 }, floweredBranches: [branch084] },
        2: { position: { left: 50, bottom: 7 }, floweredBranches: [branch085] },
        3: { position: { left: 54, bottom: 22 }, floweredBranches: [branch085] },
        4: { position: { left: 66, bottom: 13 }, floweredBranches: [branch087] },
      },
    },
    level5: {
      0: {
        0: { position: { right: 1, top: -20 } },
        1: { position: { right: 1, top: -20 } },
        2: { position: { right: 1, top: -20 } },
      },
    },
  },
};
