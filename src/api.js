import axios from 'axios';
import * as constants from './constants';

export const client = axios.create({
  baseURL: constants.URL_BASE,
});

const api = {
  neuron: {
    async getNeuronById(id = 1) {
      const endpoint = `/api/neurons/${id}`;
      const res = await client.get(endpoint);
      return res;
    },
  },

  user: {
    async signIn({ email, password }) {
      const endpoint = '/api/auth/user/sign_in';
      const res = await client.post(endpoint, { email, password });
      return res;
    },
    async validateToken() {
      const endpoint = '/api/auth/user/validate_token';
      const headers = client.defaults.headers.common;
      const res = await client.get(endpoint, headers);
      return res;
    },
    async signOut() {
      const endpoint = '/api/auth/user/sign_out';
      const res = await client.delete(endpoint);
      return res;
    },
    async contentTasks(page = 1) {
      const endpoint = '/api/users/content_tasks';
      const res = await client.get(endpoint, { page });
      return res;
    },
  },

  contents: {
    async getContentById(neuronId = 1, contentId = 1) {
      const endpoint = `/api/neurons/${neuronId}/contents/${contentId}`;
      const res = await client.get(endpoint);
      return res;
    },
    async storeContentTask(neuronId = 1, contentId = 1) {
      const endpoint = `/api/neurons/${neuronId}/contents/${contentId}/tasks`;
      const res = await client.post(endpoint, { id: contentId });
      return res;
    },
  },

  trees: {
    async getTree() {
      const endpoint = '/api/tree';
      const res = await client.get(endpoint);
      return res;
    },
  },
};

export default api;
