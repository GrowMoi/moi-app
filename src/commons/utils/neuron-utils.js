const neuron = {
  calculateSize: ({contentsLearned, totalContents, size}) => {
    const { max, min } = size;
    let value = min;
    if (totalContents) {
      const percentage = (max - min) / totalContents;
      value = (contentsLearned * percentage) + min;
    }

    return value;
  }

}

export default neuron;
