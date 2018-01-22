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

  search: {
    async getContents(page = 1, query) {
      const endpoint = '/api/search';
      const res = await client.get(endpoint, { params: { page, query } });
      return res;
    },
    async getUsers(page = 1, query) {
      const endpoint = '/api/users/search';
      const res = await client.get(endpoint, { params: { page, query } });
      return res;
    },
  },

  user: {
    async signIn({ login, authorization_key }) {
      const endpoint = '/api/auth/user/key_authorize';
      const res = await client.post(endpoint, { login, authorization_key });
      return res;
    },
    async validation() {
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
    async getFavorites(page) {
      const endpoint = '/api/users/content_favorites';
      const res = await client.get(endpoint, { params: { page } });
      return res;
    },
    async getProfile(id) {
      const endpoint = `/api/users/${id}/profile`;
      const res = await client.get(endpoint);
      return res;
    },
    async updateUserAccount(data) {
      const endpoint = '/api/users/account';
      const res = await client.put(endpoint, { ...data });
      return res;
    },
  },

  leaderboard: {
    async getLeaderboard(user_id) {
      const endpoint = '/api/leaderboard';
      const res = await client.get(endpoint, { user_id });
      return res;
    }
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
    async storeAsFavorite(neuronId, contentId) {
      const endpoint = `/api/neurons/${neuronId}/contents/${contentId}/favorites`;
      const res = await client.post(endpoint, { id: contentId });
      return res;
    },
    async readContent(neuronId = 1, contentId = 1) {
      const endpoint = `/api/neurons/${neuronId}/contents/${contentId}/read`;
      const res = await client.post(endpoint, { neuron_id: neuronId, content_id: contentId });
      return res;
    },
    async storeNotes(neuronId = 1, contentId = 1, notes) {
      const endpoint = `/api/neurons/${neuronId}/contents/${contentId}/notes`;
      const res = await client.post(endpoint, { note: notes });
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
