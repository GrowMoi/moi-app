import axios from 'axios';
import neuronJSON from './mocks/neuronid-1.json';
import treeJSON from './mocks/tree.json';

const api = {
  neuron: {
    async getNeuronById(id = 1) {
      const response = await neuronJSON;
      return response;
    },
  },

  user: {
    async getUserTree(id = 1) {
      const tree = await treeJSON;
      return tree;
    },
  },
};

export default api;
