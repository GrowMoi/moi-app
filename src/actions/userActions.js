import { Actions } from 'react-native-router-flux';
import { Alert } from 'react-native';
import api from '../api';
import * as actionTypes from './actionTypes';

const notAuthenticate = () => ({
  type: actionTypes.AUTH_NOTVALID,
});

const login = (user, headers) => ({
  type: actionTypes.LOGIN,
  user,
  headers,
});

const loginAsync = ({ email, password }) => async (dispatch) => {
  let res;
  try {
    res = await api.user.signIn({ email, password });
    const { data: { data: user }, headers } = res;
    dispatch(login(user, headers));
    Actions.moiDrawer();
  } catch (error) {
    dispatch(notAuthenticate());
    Alert.alert('Credenciales Incorrectas');
  }

  return res;
};

const validateToken = () => async (dispatch) => {
  let res;
  try {
    dispatch({ type: actionTypes.VALIDATE_TOKEN });
    res = await api.user.validateToken();
    const { data: { data: user }, headers } = res;
    dispatch(login(user, headers));
  } catch (error) {
    dispatch(notAuthenticate());
  }

  return res;
};

const logoutAsync = () => async (dispatch) => {
  let res;
  try {
    res = await api.user.signOut();
    dispatch({ type: actionTypes.LOGOUT });
    Actions.login();
  } catch (error) {
    // console.log('SING OUT', error);
  }

  return res;
};

export default {
  loginAsync,
  validateToken,
  logoutAsync,
};
