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
    async signIn({ login, authorization_key }) {
      const endpoint = '/api/auth/user/key_authorize';
      const res = await client.post(endpoint, { login, authorization_key });
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
    async storeTask(neuronId = 1, contentId = 1) {
      const endpoint = `/api/neurons/${neuronId}/contents/${contentId}/tasks`;
      const res = await client.post(endpoint, { id: contentId });
      return res;
    },
    async readContent(neuronId = 1, contentId = 1) {
      const endpoint = `/api/neurons/${neuronId}/contents/${contentId}/read`;
      const res = await client.post(endpoint, { neuron_id: neuronId, content_id: contentId });
      return res;
    },
  },

  preferences: {
    async update(kind, level) {
      const endpoint = `/api/content_preferences/${kind}`;
      const res = await client.put(endpoint, { kind, level });
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

  learn: {
    async learn(testId = 1, answers = '') {
      const endpoint = '/api/learn';
      const res = await client.post(endpoint, { test_id: testId, answers });
      return res;
    },
  },
};

export default api;
