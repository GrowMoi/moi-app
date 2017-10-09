import { AsyncStorage } from 'react-native';
import api from '../api';
import * as actionTypes from './actionTypes';

const authenticate = response => ({
  type: actionTypes.AUTH_VALID,
  payload: response,
});

const notAuthenticate = () => ({
  type: actionTypes.AUTH_NOTVALID,
});

const loginAsync = user => async (dispatch) => {
  let response;
  try {
    response = await api.user.sign_in(user);
    dispatch(authenticate(response));
  } catch (error) {
    dispatch(notAuthenticate());
  }

  return response;
};

const validateToken = () => async (dispatch) => {
  let response;
  try {
    response = await api.user.validate_token();
    dispatch(authenticate(response));
  } catch (error) {
    dispatch(notAuthenticate());
    const auth = await AsyncStorage.getItem('@store:auth');
    if (auth) { AsyncStorage.removeItem('@store:auth'); }
  }

  return response;
};

export default {
  loginAsync,
  validateToken,
};
