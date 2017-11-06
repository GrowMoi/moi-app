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
        0: { position: { left: 123, bottom: 50 } },
      },
    },
    level3: {
      0: {
        0: { position: { right: 20, bottom: 1 } },
      },
    },
    level4: {
      0: {
        0: { position: { right: 15, bottom: 7 } },
        1: { position: { right: 38, bottom: 13 } },
        2: { position: { right: 40, bottom: 1 } },
      },
    },
    level5: {
      0: { position: { right: 1, bottom: 20 } },
      1: { position: { right: 4, bottom: 20 } },
      2: { position: { right: 4, bottom: 20 } },
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
        0: { position: { left: 146, bottom: 56 } },
      },
    },
    level3: {
      0: {
        0: { position: { right: 16, bottom: 14 } },
        1: { position: { left: 6, bottom: 11 } },
      },
    },
    level4: {
      0: {
        0: { position: { right: 14, bottom: 14 } },
        1: { position: { right: 13, bottom: 27 } },
        2: { position: { left: 3, bottom: 22 } },
      },
      1: {
        0: { position: { right: 14, bottom: 10 } },
      },
    },
    level5: {
      0: { position: { right: 1, bottom: 20 } },
      1: { position: { right: 1, bottom: 20 } },
      2: { position: { right: 1, bottom: 20 } },
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
        0: { position: { right: 153, bottom: 58 } },
      },
    },
    level3: {
      0: {
        0: { position: { left: 15, bottom: 4 } },
      },
    },
    level4: {
      0: {
        0: { position: { right: 1, top: -20 } },
        1: { position: { right: 1, top: -20 } },
        2: { position: { right: 1, top: -20 } },
      },
      1: {
        0: { position: { right: 1, top: -20 } },
        1: { position: { right: 1, top: -20 } },
        2: { position: { right: 1, top: -20 } },
      },
    },
    level5: {
      0: { position: { right: 1, top: -20 } },
      1: { position: { right: 1, top: -20 } },
      2: { position: { right: 1, top: -20 } },
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
        0: { position: { right: 133, bottom: 43 } },
      },
    },
    level3: {
      0: {
        0: { position: { left: 22, bottom: 20 } },
        1: { position: { left: 34, top: 1 } },
      },
    },
    level4: {
      0: {
        0: { position: { right: 1, top: -20 } },
        1: { position: { right: 1, top: -20 } },
        2: { position: { right: 1, top: -20 } },
      },
      1: {
        3: { position: { right: 1, top: -20 } },
        4: { position: { right: 1, top: -20 } },
        5: { position: { right: 1, top: -20 } },
      },
    },
    level5: {
      0: { position: { right: 1, top: -20 } },
      1: { position: { right: 1, top: -20 } },
      2: { position: { right: 1, top: -20 } },
    },
  },
};
