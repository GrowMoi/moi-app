import axios from 'axios';
import * as constants from './constants';
import rateLimit from 'axios-rate-limit';
import { networkAlertDispatched } from './actions/deviceActions'
import { NetInfo } from 'react-native'

const REQUEST_TIMEOUT = 3000
const CancelToken = axios.CancelToken;
const source = CancelToken.source();

const client = axios.create({
  baseURL: constants.URL_BASE,
  timeout: REQUEST_TIMEOUT,
  cancelToken: source.token,
});


export const cloudinaryClient = axios.create({
  baseURL: constants.CLOUDINARY_BASE,
});

const validateConnection = () => {
  NetInfo.isConnected.fetch()
    .then(isConnected => {
      if(!isConnected) {
        setTimeout(() => {
          source.cancel('timeout exceeded');
        }, REQUEST_TIMEOUT)
      }
    })
}

client.interceptors.request.use(
  (config) => {
    // Do something before request is sent
    validateConnection();
    return config;
  },
  (error) => {
  // Do something with request error
  return Promise.reject(error);
});

client.interceptors.response.use(
  (config) => {
    return config
  },
  (error) => {
    const regex = /^(?=.*\btimeout\b)(?=.*\bexceeded\b).*$/gi;
    if(regex.test(error.message) || axios.isCancel(error)) {
      networkAlertDispatched(true)
    }
    return Promise.reject(error);
  }
)

export const http = rateLimit(client, { maxRequests: 2, perMilliseconds: 1000, maxRPS: 2 })

export default client;