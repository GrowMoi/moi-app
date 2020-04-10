import axios from 'axios';
import * as constants from './constants';
import rateLimit from 'axios-rate-limit';
import { networkAlert } from './actions/deviceActions'
import store from './store'

const client = axios.create({
  baseURL: constants.URL_BASE,
  timeout: 3000,
});

export const cloudinaryClient = axios.create({
  baseURL: constants.CLOUDINARY_BASE,
});

client.interceptors.response.use(
  (config) => {
    return config
  },
  (error) => {
    const regex = /^(?=.*\btimeout\b)(?=.*\bexceeded\b).*$/gi;
    if(regex.test(error.message)) {
      store.dispatch(networkAlert(true))
    }
    return Promise.reject(error);
  }
)

export const http = rateLimit(client, { maxRequests: 2, perMilliseconds: 1000, maxRPS: 2 })

export default client;