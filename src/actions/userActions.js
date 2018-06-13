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

const setAchievements = achievements => ({
  type: actionTypes.GET_USER_ACHIEVEMENTS,
  payload: achievements,
});

const loginAsync = ({ login, authorization_key: authorizationKey }) => async (dispatch) => {
  try {
    const res = await api.user.signIn({ login, authorization_key: authorizationKey });
    const { data: { data: user }, headers } = res;

    dispatch(setHeaders(headers));
    dispatch(userLogin(user));

    Actions.moiDrawer();
    return res;
  } catch (error) {
    dispatch(notAuthenticate());
    throw new Error(error);
  }

};

const registerAsync = ({ username, email, age, school, country, city, authorization_key: authorizationKey }) => async (dispatch) => {
  let res;
  try {
    res = await api.user.register({ username, email, age, school, country, city, authorization_key: authorizationKey });
    const { data: { data: user }, headers } = res;

    await dispatch(setHeaders(headers));

    Actions.pop();
    Alert.alert('Usuario Registrado correctamente');
  } catch (error) {
    Alert.alert('Ha ocurrido un error al registrarse.');
  }

  return res;
};

const validateToken = () => async (dispatch) => {
  let res;
  try {
    dispatch({ type: actionTypes.VALIDATE_TOKEN });
    res = await api.user.validation();

    const { data: { data: user }, headers } = res;
    await dispatch(setHeaders(headers));
    dispatch(userLogin(user));
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
    dispatch(setHeaders(headers));
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
    await dispatch(setHeaders(headers));
    dispatch(loadContentTasks(data));
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

    await dispatch(setHeaders(headers));
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

    await dispatch(setHeaders(headers));
    Alert.alert('Favorito', 'Listo, Este contenido fue agregado como favorito.');
  } catch (error) {
    // console.log(error);
    Alert.alert('Favorito', 'Ups!, No pudimos agregar este contenido como favorito, intentalo más tarde.');
  }
  return res;
};

const readContentAsync = (neuronId, contentId) => async (dispatch) => {
  try {
    const res = await api.contents.readContent(neuronId, contentId);
    const { headers, data } = res;

    await dispatch(setHeaders(headers));
    await dispatch(storeQuiz(data.test));

    return res;
  } catch (error) {
    throw new Error(error);
  }

};

const learnContentsAsync = (testId, answers) => async (dispatch) => {
  let res;
  try {
    res = await api.learn.learn(testId, answers);
    const { headers } = res;

    await dispatch(setHeaders(headers));
  } catch (error) {
    // console.log(error);
    throw new Error(error);
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
    await dispatch(setHeaders(headers));
    dispatch(loadUserFavorites(data));
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

    await dispatch(setHeaders(headers));
    dispatch(getProfile(data));
  } catch (error) {
    // console.log(error)
  }

  return res;
};

const updateUserAccountAsync = (dataToChange, id) => async (dispatch) => {
  let res;
  try {
    res = await api.user.updateUserAccount(dataToChange);
    const { headers } = res;
    await dispatch(setHeaders(headers));

    dispatch(getUserProfileAsync(id));
  } catch (error) {
    // console.log(error)
  }
  return res;
};

const getAchievementsAsync = () => async (dispatch) => {
  let res;
  try {
    res = await api.user.getAchievements();
    const { data: { achievements }, headers } = res;

    await dispatch(setHeaders(headers));
    dispatch(setAchievements(achievements));
  } catch (error) {
    // console.log(error)
  }

  return res;
};

const updateAchievementsAsync = id => async (dispatch) => {
  let res;
  try {
    res = await api.user.updateAchievements(id);
    const { headers } = res;

    await dispatch(setHeaders(headers));
    dispatch(getAchievementsAsync());
  } catch (error) {
    // console.log(error);
    Alert.alert('Error', 'Ups, tuvimos un error al intentar actualizar este item, intentalo más tarde por favor');
  }

  return res;
};

export default {
  loginAsync,
  registerAsync,
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
  getAchievementsAsync,
  updateAchievementsAsync,
};
