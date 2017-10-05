import axios from 'axios';
import { AsyncStorage } from 'react-native';
import * as constants from './constants';
import neuronJSON from './mocks/neuronid-1.json';
import treeJSON from './mocks/tree.json';
import contentJSON from './mocks/contentid-1.json';
import { setAuthorizationToken } from './commons/utils';

export const client = axios.create({
  baseURL: constants.URL_BASE,
});

const handleError = (err) => {
  console.log('ERROR', err);
};

const setHeaders = async (response) => {
  const headers = {
    'access-token': response.headers['access-token'],
    'token-type': response.headers['token-type'],
    client: response.headers.client,
    expiry: response.headers.expiry,
    uid: response.headers.uid,
  };

  await AsyncStorage.setItem('auth', JSON.stringify(headers));
  setAuthorizationToken(headers);
};

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
    async sign_in(profile) {
      const endpoint = '/api/auth/user/sign_in';

      const response = await client.post(endpoint, profile);
      setHeaders(response);

      return response.data.data;
    },
    async validate_token() {
      const endpoint = '/api/auth/user/validate_token';

      const response = await client.get(endpoint);
      setHeaders(response);

      return response.data.data;
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
