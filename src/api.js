import axios from 'axios';
import neuronJSON from './mocks/neuronid-1.json';
import treeJSON from './mocks/tree.json';
import contentJSON from './mocks/contentid-1.json';

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

  content: {
    async getContentById(id = 1) {
      const content = await contentJSON;
      return content;
    },
  },
};

export default api;
