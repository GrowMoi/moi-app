// Branch
import branch004 from '../../../../../assets/images/tree/arbol_adulto/nivel_3/fondo-rama004.png';
import branch002 from '../../../../../assets/images/tree/arbol_adulto/nivel_3/fondo-rama002.png';
import branch001 from '../../../../../assets/images/tree/arbol_adulto/nivel_3/fondo001.png';
import branch031 from '../../../../../assets/images/tree/arbol_adulto/nivel_4/fondo-rama031.png';
import branch079 from '../../../../../assets/images/tree/arbol_adulto/nivel_3/fondo-rama079.png';
import branch082 from '../../../../../assets/images/tree/arbol_adulto/nivel_4/fondo082.png';
import branch080 from '../../../../../assets/images/tree/arbol_adulto/nivel_3/fondo-rama080.png';
import branch033 from '../../../../../assets/images/tree/arbol_adulto/nivel_3/fondo-rama033.png';
import branch060 from '../../../../../assets/images/tree/arbol_adulto/nivel_3/fondo060.png';

export default {
  left: {
    neuron: {
      color: 'blue',
    },
    level3: {
      0: {
        position: { right: 40, bottom: 10 },
        floweredImg: [branch004, branch002],
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
      },
      1: {
        position: { left: 1, bottom: 36 },
        floweredImg: [branch001, branch031],
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
      },
    },
  },

  right: {
    neuron: {
      color: 'fuchsia',
    },
    level3: {
      0: {
        position: { left: 55, top: 2 },
        floweredImg: [],
      },
      1: {
        position: { left: 67, bottom: 31 },
        floweredImg: [branch079, branch080, branch082],
      },
    },
  },
};
