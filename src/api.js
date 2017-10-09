import axios from 'axios';
import { AsyncStorage } from 'react-native';
import * as constants from './constants';
import { setAuthorizationToken } from './commons/utils';

export const client = axios.create({
  baseURL: constants.URL_BASE,
});

const handleError = (err) => {
  console.log('ERROR', err);
};

const parseExpiry = (headers) => { // eslint-disable-line
  return (parseInt(headers['expiry'], 10) * 1000) || null;
};

const setAuthHeaders = async (res) => {
  const authHeader = {
    'access-token': res.headers['access-token'],
    'token-type': res.headers['token-type'],
    'client': res.headers['client'], // eslint-disable-line
    'expiry': res.headers['expiry'], // eslint-disable-line
    'uid': res.headers['uid'], // eslint-disable-line
  };

  try {
    // await AsyncStorage.removeItem('auth');
    await AsyncStorage.setItem('@store:auth', JSON.stringify(authHeader));
    const item = await AsyncStorage.getItem('@store:auth');
    console.log('ASYNC STORAGE', item);

    setAuthorizationToken(authHeader);
  } catch (error) {
    console.log('ERROR ASYNC STORAGE');
  }
};

const api = {
  neuron: {
    async getNeuronById(id = 1) {
      const endpoint = `/api/neurons/${id}`;

      const res = await client.get(endpoint);
      await setAuthHeaders(res);

      console.log('GET NEURON BY ID', res);

      return res.data;
    },
  },

  user: {
    async sign_in(profile) {
      const endpoint = '/api/auth/user/sign_in';

      const res = await client.post(endpoint, profile);
      await setAuthHeaders(res);
      console.log('SING IN', res);

      return res.data.data;
    },
    async validate_token() {
      const endpoint = '/api/auth/user/validate_token';

      const res = await client.get(endpoint);
      await setAuthHeaders(res);

      return res.data.data;
    },
  },

  contents: {
    async getContentById(neuronId = 1, contentId = 1) {
      const endpoint = `api/neurons/${neuronId}/contents/${contentId}`;
      const res = await client.get(endpoint);
      await setAuthHeaders(res);
      console.log('CONTENT ID', res);

      return res.data;
    },
  },

  trees: {
    async getTree() {
      const endpoint = '/api/tree';
      const res = await client.get(endpoint);
      // console.log('GET TREE', res);
      // await setAuthHeaders(res);

      return res.data;
    },
  },
};

export default api;
