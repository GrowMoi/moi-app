import { AsyncStorage } from 'react-native';

let HEADERS = ['access-token', 'token-type', 'client', 'expiry', 'uid'];

const tokenMiddleware = args => store => next => (action) => {
  if (!action) { action = { type: '' }; }
  const { customHeaders = [], validateAction = 'VALIDATE_TOKEN', logoutAction = 'LOGOUT', client } = args;
  HEADERS = [...new Set([...HEADERS, ...customHeaders])];
  if (action.type === validateAction) {
    HEADERS.forEach(async token => {
      client.defaults.headers.common[token] = await AsyncStorage.getItem(token);
    });
  } else if (action.type === logoutAction) {
    HEADERS.forEach((token) => {
      AsyncStorage.removeItem(token);
    });
  } else {
    const { headers } = action;
    if (headers) {
      if (headers['access-token']) {
        HEADERS.forEach(async (token) => {
          client.defaults.headers.common[token] = headers[token];
          await AsyncStorage.setItem(token, headers[token]);
        });
      }
    }
  }
  return next(action);
};

export default tokenMiddleware;
