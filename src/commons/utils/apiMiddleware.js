import { AsyncStorage } from 'react-native';
import * as actionTypes from '../../actions/actionTypes';

const HEADERS = ['access-token', 'token-type', 'client', 'expiry', 'uid'];

const tokenMiddleware = args => store => next => async (action) => {
  if (!action) { action = { type: '' }; }
  const {
    customHeaders = [],
    validateAction = actionTypes.VALIDATE_TOKEN,
    authNotValid = actionTypes.AUTH_NOTVALID,
    logoutAction = actionTypes.LOGOUT,
    client
  } = args;

  HEADERS = [...new Set([...HEADERS, ...customHeaders])]; // ["access-token", "token-type", "client", "expiry", "uid"]
  client.defaults.headers.common['Content-type'] = 'application/json';

  // Clean All - remove axios client, headers and async storage from the app.
  const cleanAll = async () => {
    HEADERS.forEach((token) => {
      delete client.defaults.headers.common[token];
    });
    await AsyncStorage.multiRemove(HEADERS);
  };

  if (action.type === validateAction) {
    HEADERS.forEach(async token => {
      const tokenFromStorage = await AsyncStorage.getItem(token);

      client.defaults.headers.common = {
        ...client.defaults.headers.common,
        [token]: tokenFromStorage
      };

    });
  } else if (action.type === authNotValid) {
    await cleanAll();
  } else if (action.type === logoutAction) {
    await cleanAll();
  } else {

    const { headers } = action;
    if (Object.keys((headers || [])).length > 0) {
      if (headers['access-token']) {
        const multiHeaders = HEADERS.map((key) => {
          client.defaults.headers.common[key] = headers[key];
          return [key, headers[key]]
        });

        await AsyncStorage.multiSet(multiHeaders);
      }
    }
  }

  return next(action);
};

export default tokenMiddleware;
