import { Actions } from 'react-native-router-flux';
import { Alert } from 'react-native';
import api from '../api';
import * as actionTypes from './actionTypes';
import { setHeaders } from './headerActions';

const notAuthenticate = () => ({
  type: actionTypes.AUTH_NOTVALID,
});

const login = (user, headers) => ({
  type: actionTypes.LOGIN,
  user,
  headers,
});

const loadContentTasks = userContentTasks => ({
  type: actionTypes.GET_USER_CONTENT_TASKS,
  payload: userContentTasks,
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

const loadUserContentTasksAsync = page => async (dispatch) => {
  let res;
  try {
    res = await api.user.contentTasks(page);
    const { data, headers } = res;
    dispatch(loadContentTasks(data));
    dispatch(setHeaders(headers));
  } catch (error) {
    // console.log(error);
  }

  return res;
};

const storeTaskAsync = (neuronId = 1, contentId = 1) => async (dispatch) => {
  let res;
  try {
    res = await api.contents.storeTask(neuronId, contentId);
    const { headers } = res;
    dispatch(setHeaders(headers));
  } catch (error) {
    // console.log(error);
  }
  return res;
};

const readContentAsync = (neuronId = 1, contentId = 1) => async (dispatch) => {
  let res;
  try {
    res = await api.contents.readContent(neuronId, contentId);
    console.log(res);
    const { headers } = res;
    dispatch(setHeaders(headers));
  } catch (error) {
    // console.log(error);
  }
  return res;
};

export default {
  loginAsync,
  validateToken,
  logoutAsync,
  loadUserContentTasksAsync,
  storeTaskAsync,
  readContentAsync,
};
