import axios from 'axios';
import * as constants from './constants';
import rateLimit from 'axios-rate-limit';
import { networkAlertDispatched } from './actions/deviceActions'

const defaults = {
  timeout: 3000
}

const client = axios.create({
  baseURL: constants.URL_BASE,
});

export const cloudinaryClient = axios.create({
  baseURL: constants.CLOUDINARY_BASE,
});

client.interceptors.request.use(
  (config) => {
    console.log('REQUEST')
    return config
  },
  (error) => {
    console.log('ERROR REQUEST')
    return Promise.reject(error);
  }
)

client.interceptors.response.use(
  (config) => {
    return config
  },
  (error) => {
    const regex = /^(?=.*\btimeout\b)(?=.*\bexceeded\b).*$/gi;
    const regexNetwork = /network/gi;
    if(regex.test(error.message) || axios.isCancel(error) || regexNetwork.test(error.message)) {
      networkAlertDispatched(true)
    }
    return Promise.reject(error);
  }
)

export const http = rateLimit(client, { maxRequests: 2, perMilliseconds: 1000, maxRPS: 2 })

const createAbortInfo = (options = {}) => {
  const abort = axios.CancelToken.source();
  const timeToExpire = options.configTimeout || defaults.timeout;
  const id = setTimeout(
    () => abort.cancel(`Timeout of ${defaults.timeout}ms. exceeded`),
    timeToExpire
  )
  return { abort, timeToExpire, timeoutId: id }
}

export const axiosLimit = {
  get: (url, axiosRequestConfig = {}) => {
    const { configTimeout, ...axiosConfig } = axiosRequestConfig
    const { abort, timeoutId } = createAbortInfo({ configTimeout })
    return http
      .get(url, { cancelToken: abort.token, ...axiosConfig })
      .then(response => {
        clearTimeout(timeoutId)
        return response
      })
  },

  post: (url, data = {}, axiosRequestConfig = {}) => {
    const { configTimeout, ...axiosConfig } = axiosRequestConfig
    const { abort, timeoutId } = createAbortInfo({ configTimeout })
    return http
      .post(url, data, { cancelToken: abort.token, ...axiosConfig })
      .then(response => {
        clearTimeout(timeoutId)
        return response
      })
  },

  put: (url, data = {}, axiosRequestConfig = {}) => {
    const { configTimeout, ...axiosConfig } = axiosRequestConfig
    const { abort, timeoutId } = createAbortInfo({ configTimeout })
    return http
      .put(url, data, { cancelToken: abort.token, ...axiosConfig })
      .then(response => {
        clearTimeout(timeoutId)
        return response
      })
  },

  delete: (url, axiosRequestConfig = {}) => {
    const { configTimeout, ...axiosConfig } = axiosRequestConfig
    const { abort, timeoutId } = createAbortInfo({ configTimeout })
    return http
      .delete(url, { cancelToken: abort.token, ...axiosConfig })
      .then(response => {
        clearTimeout(timeoutId)
        return response
      })
  }
}

export default client;