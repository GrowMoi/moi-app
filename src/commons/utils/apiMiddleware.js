import { AsyncStorage } from 'react-native';
import * as actionTypes from '../../actions/actionTypes';

const HEADERS = ['access-token', 'token-type', 'client', 'expiry', 'uid'];

const tokenMiddleware = args => store => next => async (action) => {
  if (!action) { action = { type: '' }; }
  const { customHeaders = [], validateAction = actionTypes.VALIDATE_TOKEN, authNotValid = actionTypes.AUTH_NOTVALID, logoutAction = 'LOGOUT', client } = args;

  HEADERS = [...new Set([...HEADERS, ...customHeaders])];

  if (action.type === validateAction) {
    HEADERS.forEach(async token => {
      const tokenFromStorage = await AsyncStorage.getItem(token);

      client.defaults.headers.common = {
        ...client.defaults.headers.common,
        [token]: tokenFromStorage
      };

    });
  } else if (action.type === authNotValid) {
    await AsyncStorage.multiRemove(HEADERS);
  } else if (action.type === logoutAction) {
    HEADERS.forEach(async (token) => {
      await AsyncStorage.removeItem(token);
    });
  } else {

    const { headers } = action;

    if (headers) {
      if (headers['access-token']) {

        const multiHeaders = HEADERS.map((token) => {
          client.defaults.headers.common[token] = headers[token];
          return [token, headers[token]]
        });

        await AsyncStorage.multiSet(multiHeaders);
      }
    }
  }
  return next(action);
};

export default tokenMiddleware;
