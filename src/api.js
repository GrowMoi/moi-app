import axios from 'axios';
import * as constants from './constants';
import { AsyncStorage } from 'react-native';

export const client = axios.create({
  baseURL: constants.URL_BASE,
});

export const cloudinaryClient = axios.create({
  baseURL: constants.CLOUDINARY_BASE,
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
    async register({ username, email, age, school, country, city, authorization_key }) {
      const endpoint = '/api/auth/user';
      const res = await client.post(endpoint, { username, email, age, school, country, city, authorization_key });
      return res;
    },
    async validation() {
      const endpoint = '/api/auth/user/validate_token';
      let headers = client.defaults.headers.common;

      const AUTH_HEADERS = ['access-token', 'token-type', 'client', 'expiry', 'uid'];

      // Verify if in the keys exist an access token.
      const hasAccessTokenStored = await AsyncStorage.getItem('access-token');
      if (hasAccessTokenStored) {
        const storeHeaders = await AsyncStorage.multiGet(AUTH_HEADERS);
        storeHeaders.forEach(([key, value]) => {
          headers = {
            ...headers,
            [key]: value,
          }
        })
      } else {
        // Remove keys and nothing more to do.
        await AsyncStorage.multiRemove(AUTH_HEADERS);
        throw new Error('Not have access token stored');
      }

      try {
        const res = await client.get(endpoint, headers);
        return res;
      } catch (error) {

        throw new Error(error.message);
      }
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
    async getAchievements() {
      const endpoint = '/api/users/achievements';
      const res = await client.get(endpoint);
      return res;
    },
    async updateAchievements(id) {
      const endpoint = `/api/users/achievements/${id}/active`;
      const res = await client.put(endpoint, { id });
      return res;
    },
    async getNotes(page) {
      const endpoint = '/api/users/content_notes';
      const res = await client.get(endpoint, { params: { page } });
      return res;
    },
    async updateUserProfileImage(imageBase64) {
      const endpoint = '/api/users/user_image';
      const res = await client.put(endpoint, { image: imageBase64 });
      return res;
    }
  },

  leaderboard: {
    async getLeaderboard(user_id) {
      const endpoint = '/api/leaderboard';
      const res = await client.get(endpoint, { user_id });
      return res;
    },
    async getLeaderboardSuperEvent(user_id, event_id) {
      const endpoint = `/api/leaderboard?event_id=${event_id}&page=1&per_page=20&user_id=${user_id}`;
      const res = await client.get(endpoint);
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
    async storeAsFavorite(neuronId, contentId) {
      const endpoint = `/api/neurons/${neuronId}/contents/${contentId}/favorites`;
      const res = await client.post(endpoint, { id: contentId });
      return res;
    },
    async readContent(neuronId = 1, contentId = 1) {
      const endpoint = `/api/neurons/${neuronId}/contents/${contentId}/read`;
      try {
        const res = await client.post(endpoint, { neuron_id: neuronId, content_id: contentId });
        return res;
      } catch (error) {
        throw new Error(error);
      }
    },
    async storeNotes(neuronId = 1, contentId = 1, notes) {
      const endpoint = `/api/neurons/${neuronId}/contents/${contentId}/notes`;
      const res = await client.post(endpoint, { note: notes });
      return res;
    },

    async getRecomendedContents() {
      const endpoint = '/api/users/recommended_neurons';
      const res = await client.get(endpoint);
      return res;
    },

    async getRecommendedContentsOfMaxContent(neuronId = 1, kind) {
      const endpoint = `/api/neurons/${neuronId}/recommended_contents/${kind}`

      try {
        const res = await client.get(endpoint);
        return res
      } catch (error) {
        throw new Error(error)
      }
    }
  },

  preferences: {
    async update(kind, level) {
      const endpoint = `/api/content_preferences/${kind}`;
      const res = await client.put(endpoint, { kind, level });
      return res;
    },
  },

  trees: {
    async getTree(username) {
      const endpoint = '/api/tree';

      try {
        const res = await client.get(endpoint, { params: { username } });
        return res;
      } catch (error) {
        throw new Error(error);
      }
    },
  },

  tree_image: {
    async uploadTreeImage(image) {
      const endpoint = '/api/users/tree_image';

      try {
        const res = await client.put(endpoint, { image_app: image });
        return res;
      } catch (error) {
        throw new Error(error);
      }
    },
  },

  learn: {
    async learn(testId = 1, answers = '') {
      const endpoint = '/api/learn';
      const res = await client.post(endpoint, { test_id: testId, answers });
      return res;
    },
  },

  profiles: {
    async getProfile(username) {
      const endpoint = '/api/users/profile';
      const res = await client.get(endpoint, { params: { username } });
      return res;
    },
  },

  notifications: {
    async getNotifications(page = 1) {
      const endpoint = '/api/notifications';
      const res = await client.get(endpoint, { params: { page } });
      return res;
    },
    async readNotificationById(id) {
      const endpoint = `/api/notifications/${id}/read_notifications`;
      const res = await client.post(endpoint, { id });
      return res;
    }
  },

  tutors: {
    async getRecomendations(page = 1, data_format = 'contents') {
      const endpoint = '/api/tutors/recommendations';
      const res = await client.get(endpoint, { params: { page, data_format } })
      return res;
    },
    async getDetails() {
      const endpoint = '/api/tutors/details';
      const res = await client.get(endpoint)
      return res;
    }
  },

  players: {
    async getQuizForPlayer(quizId, playerId) {
      const endpoint = `/api/quizzes/${quizId}/players/${playerId}`;
      const res = await client.get(endpoint, { params: { quiz_id: quizId, player_id: playerId } });
      return res;
    },

    async evaluateQuiz(quizId, playerId, answers) {
      const endpoint = `/api/quizzes/${quizId}/players/${playerId}/answer`;

      const res = await client.post(
        endpoint,
        {
          quiz_id: quizId,
          player_id: playerId,
          answers: JSON.stringify(answers),
        }
      );
      return res;
    },

    async getFinalTest() {
      const endpoint = `/api/users/final_test`;
      const res = await client.post(endpoint, {});
      return res;
    },

    async evaluateFinalTest(finalTestId, answers) {
      const endpoint = `/api/users/final_test/${finalTestId}/answer`;
      const res = await client.post(
        endpoint,
        {
          id: finalTestId,
          answers: answers,
        }
      );
      return res;
    },

    async saveCertificate(certificateURL) {
      const endpoint = '/api/users/certificates';
      const res = await client.post(
        endpoint,
        {
          media_url: certificateURL
        }
      );
      return res;
    },
    async getLatestCertificates() {
      const endpoint = '/api/users/certificates?page=1';
      const res = await client.get(
        endpoint
      );
      return res;
    },
  },

  events: {
    async getEventsToday() {
      const endpoint = '/api/events/today';
      const res = await client.get(
        endpoint
      );
      return res;
    },

    async getEventsWeek() {
      const endpoint = '/api/events/week';
      const res = await client.get(
        endpoint
      );
      return res;
    },

    async getEvents() {
      const endpoint = '/api/events';
      const res = await client.get(
        endpoint
      );
      return res;
    },

    async takeEvent(eventId) {
      const endpoint = `/api/users/events/${eventId}/take`;
      const res = await client.post(endpoint, { id: eventId });
      return res;
    },

    async takeSuperEvent(eventId) {
      const endpoint = `/api/users/events/${eventId}/take_super_event`;
      const res = await client.post(endpoint, { id: eventId });
      return res;
    },

    async getEventInProgress() {
      const endpoint = '/api/users/event_in_progress';
      const res = await client.get(
        endpoint,
        {}
      );
      return res;
    },
  },

  sharings: {
    async sharings(titulo, descripcion, uri, imagen_url) {
      const endpoint = '/api/sharings';
      const res = await client.post(
        endpoint,
        {
          titulo,
          descripcion,
          uri,
          imagen_url
        },
      );
      return res;
    },
  },

  cloudinary: {
    async uploadImage(base64Image) {
      const endpoint = '/v1_1/moi-images/upload';

      const res = await cloudinaryClient.post(
        endpoint,
        {
          upload_preset: 'nmk8efc6',
          tags: 'browser_upload',
          file: base64Image
        },
        {
          'content-type': 'application/json'
        },
      );
      return res.data;
    },
  }
};

export default api;
