import { Actions } from 'react-native-router-flux';
import { Alert } from 'react-native';
import api from '../api';
import * as actionTypes from './actionTypes';
import { setHeaders } from './headerActions';

const notAuthenticate = () => ({
  type: actionTypes.AUTH_NOTVALID,
});

const userLogin = user => ({
  type: actionTypes.LOGIN,
  user,
});

const loadContentTasks = userContentTasks => ({
  type: actionTypes.GET_USER_CONTENT_TASKS,
  payload: userContentTasks,
});

const storeQuiz = quiz => ({
  type: actionTypes.STORE_QUIZ,
  payload: quiz,
});

const loadUserFavorites = favorites => ({
  type: actionTypes.LOAD_USER_FAVORITES,
  payload: favorites,
});

const getProfile = profile => ({
  type: actionTypes.GET_USER_PROFILE,
  payload: profile,
});

const loginAsync = ({ login, authorization_key: authorizationKey }) => async (dispatch) => {
  let res;
  try {
    res = await api.user.signIn({ login, authorization_key: authorizationKey });
    const { data: { data: user }, headers } = res;

    dispatch(userLogin(user));
    dispatch(setHeaders(headers));
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
    res = await api.user.validation();
    const { data: { data: user }, headers } = res;
    dispatch(userLogin(user));
    dispatch(setHeaders(headers));
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

const storeTaskAsync = (neuronId, contentId) => async (dispatch) => {
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

const storeAsFavoriteAsync = (neuronId, contentId) => async (dispatch) => {
  let res;
  try {
    res = await api.contents.storeAsFavorite(neuronId, contentId);
    const { headers } = res;
    dispatch(setHeaders(headers));
    Alert.alert('Favorito', 'Listo, Este contenido fue agregado como favorito.');
  } catch (error) {
    // console.log(error);
    Alert.alert('Favorito', 'Ups!, No pudimos agregar este contenido como favorito, intentalo más tarde.');
  }
  return res;
};

const readContentAsync = (neuronId, contentId) => async (dispatch) => {
  let res;
  try {
    res = await api.contents.readContent(neuronId, contentId);
    const { headers, data } = res;

    dispatch(storeQuiz(data.test));
    dispatch(setHeaders(headers));
  } catch (error) {
    // console.log(error);
  }
  return res;
};

const learnContentsAsync = (testId, answers) => async (dispatch) => {
  let res;
  try {
    res = await api.learn.learn(testId, answers);
    const { headers } = res;

    dispatch(setHeaders(headers));
  } catch (error) {
    // console.log(error);
  }

  return res;
};

const storeNotesAsync = (neuronId, contentId, notes) => async (dispatch) => {
  let res;
  try {
    res = await api.contents.storeNotes(neuronId, contentId, notes);
    const { headers } = res;
    dispatch(setHeaders(headers));
  } catch (error) {
    // console.log(error);
  }
  return res;
};


const loadAllFavorites = page => async (dispatch) => {
  let res;
  try {
    res = await api.user.getFavorites(page);
    const { headers, data } = res;
    dispatch(loadUserFavorites(data));
    dispatch(setHeaders(headers));
  } catch (error) {
    // console.log(error)
  }

  return res;
};

const getUserProfileAsync = id => async (dispatch) => {
  let res;
  try {
    res = await api.user.getProfile(id);
    const { headers, data } = res;

    dispatch(getProfile(data));
    dispatch(setHeaders(headers));
  } catch (error) {
    // console.log(error)
  }

  return res;
};

const updateUserAccountAsync = (dataToChange, id) => async (dispatch) => {
  let res;
  try {
    await api.user.updateUserAccount(dataToChange);
    res = await api.user.getProfile(id);
    const { headers, data } = res;

    dispatch(getProfile(data));
    dispatch(setHeaders(headers));
  } catch (error) {
    // console.log(error)
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
  learnContentsAsync,
  storeNotesAsync,
  loadAllFavorites,
  storeAsFavoriteAsync,
  getUserProfileAsync,
  updateUserAccountAsync,
};
