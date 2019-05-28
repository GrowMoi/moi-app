export default {
  left: {
    neuron: {
      color: 'blue',
    },
    level3: {
      0: {
        position: { right: 40, bottom: 10 },
        floweredImg: [{uri: 'fondo_rama002'}, {uri: 'fondo_rama004'}],
        children: {
          0: {
            position: { right: 36, bottom: 4 },
            floweredImg: [],
          },
          1: {
            position: { right: 70, top: 5 },
            floweredImg: [{uri: 'fondo_rama006'}, {uri: 'fondo007'}],
          },
          2: {
            position: { right: 62, bottom: 25 },
            floweredImg: [{uri: 'fondo_rama005'}, {uri: 'fondo003'}],
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
        floweredImg: [{uri: 'fondo_rama033'}],
        children: {
          0: {
            position: { right: 12, bottom: 23 },
            floweredImg: [{uri: 'fondo032'}, {uri: 'fondo_rama034'}],
          },
          1: {
            position: { right: 9, bottom: 52 },
            floweredImg: [{uri: 'fondo032'}, {uri: 'fondo_rama034'}],
          },
          2: {
            position: { left: 20, bottom: 37 },
            floweredImg: [{uri: 'fondo032'}, {uri: 'fondo_rama034'}],
          },
        },
      },
      1: {
        position: { left: 1, bottom: 36 },
        floweredImg: [{uri: 'fondo001'}, {uri: 'fondo_rama031'}],
        children: {
          0: {
            position: { left: 30, bottom: 8 },
            floweredImg: [{uri: 'fondo_rama061'}],
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
        floweredImg: [{uri: 'fondo060'}],
        children: {
          0: {
            position: { left: 24, bottom: 32 },
            floweredImg: [{uri: 'fondo_rama061'}],
          },
          1: {
            position: { left: 47, bottom: 55 },
            floweredImg: [{uri: 'fondo_rama061'}],
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
        floweredImg: [{uri: 'fondo082'}, {uri: 'fondo_rama079'}, {uri: 'fondo_rama080'}],
        children: {
          0: {
            position: { left: 7, bottom: 40 },
            floweredImg: [{uri: 'fondo_rama083'}],
          },
          1: {
            position: { left: 78, bottom: 16 },
            floweredImg: [{uri: 'fondo_rama086'}],
          },
        },
      },
      1: {
        position: { left: 55, top: 2 },
        floweredImg: [{uri: 'fondo081'}],
        children: {
          0: {
            position: { left: 41, bottom: 4 },
            floweredImg: [],
          },
          1: {
            position: { left: 57, bottom: 27 },
            floweredImg: [{uri: 'fondo_rama084'}],
          },
          2: {
            position: { left: 84, top: 10 },
            floweredImg: [{uri: 'fondo085'}],
          },
          3: {
            position: { left: 82, bottom: 20 },
            floweredImg: [{uri: 'fondo085'}],
          },
          4: {
            position: { left: 123, bottom: 34 },
            floweredImg: [{uri: 'fondo_rama087'}],
          },
        },
      },
    },
  },
};
