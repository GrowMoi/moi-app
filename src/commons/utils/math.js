const math = {
  getRandomInt: (min = 0, max = 1) => {
    return Math.round( Math.random() * (max - min) ) + min
  },

  getRandomArbitrary: (min = 0, max = 1) => {
    return Math.random() * (max - min) + min;
  },
}

export default math;
