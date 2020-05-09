import { Actions, ActionConst } from 'react-native-router-flux';
import { Alert, AsyncStorage } from 'react-native';
import api from '../api';
import * as actionTypes from './actionTypes';
import { setHeaders } from './headerActions';
import neuronActions from './neuronActions'
import * as routeTypes from '../routeTypes'

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

const setUserFavorites = favorites => ({
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

const signOut = () => ({
  type: actionTypes.LOGOUT,
})

const resetData = () => ({
  type: actionTypes.RESET_DATA,
});

const setSettings = settings => ({
  type: actionTypes.SET_SETTINGS,
  payload: settings,
})

const setPassiveMessageSettings = passiveMessageSettings => ({
  type: actionTypes.SET_PASSIVE_MESSAGE_SETTINGS,
  payload: passiveMessageSettings,
})

const showPassiveMessageAsync = (show = true) => async (dispatch) => {
  dispatch({
    type: actionTypes.SHOW_PASSIVE_MESSAGE,
    payload: show
  });
}

const storeFinalTestResult = finalTestResult => ({
  type: actionTypes.STORE_FINAL_TEST_RESULT,
  payload: finalTestResult,
})

const signOutAsync = () => async (dispatch) => {
  await dispatch(signOut());
  await AsyncStorage.clear();

  await Actions.login({ type: ActionConst.RESET });
  await dispatch(resetData());
}

const setNotifications = (notifications) => ({
  type: actionTypes.SET_NOTIFICATIONS,
  payload: notifications,
})

const setNotificationDetails = (details) => ({
  type: actionTypes.SET_NOTIFICATION_DETAILS,
  payload: details,
})

const setNotes = (notes) => ({
  type: actionTypes.SET_USER_NOTES,
  payload: notes,
})

const reloadRandomContents = (reload) => ({
  type: actionTypes.SET_RELOAD_RANDOM_CONTENTS,
  payload: reload,
})

const storeEvents = events => ({
  type: actionTypes.STORE_EVENTS,
  payload: events,
});

const storeEventsWeek = events => ({
  type: actionTypes.STORE_EVENTS_WEEK,
  payload: events,
});

const storeQuizResult = quizResult => ({
  type: actionTypes.STORE_QUIZ_RESULT,
  payload: quizResult,
});

const storeContentsToLearn = contentsToLearn => ({
  type: actionTypes.STORE_CONTENTS_TO_LEARN,
  payload: contentsToLearn,
});

const loginAsync = ({ login, authorization_key: authorizationKey }) => async (dispatch) => {
  try {
    const res = await api.user.signIn({ login, authorization_key: authorizationKey });
    const { data: { data: user }, headers } = res;

    dispatch(setHeaders(headers));
    dispatch(userLogin(user));

    Actions.tree();
    return res;
  } catch (error) {
    dispatch(notAuthenticate());
    throw new Error(error);
  }

};

const registerAsync = ({ username, email, age, school, country, city, authorization_key: authorizationKey, onPressAlert, gender }) => async (dispatch) => {
  try {
    const res = await api.user.register({ username, email, age, school, country, city, authorization_key: authorizationKey, gender });
    const { data: { data: user }, headers } = res;

    await dispatch(setHeaders(headers));

    Alert.alert(
      `Bienvenido ${username} a Mi Aula BdP`,
      'Te haz registrado con exito!',
      [
        { text: 'Vamos a aprender!', onPress: () => onPressAlert && onPressAlert() }
      ],
      { cancelable: false },
    );
    return user;
  } catch (error) {
    Alert.alert('Ups!, Lo sentimos ha ocurrido un error al registrarse, intentalo más tarde');
    throw new Error(error);
  }

};

const validateToken = () => async (dispatch, getStore) => {
  dispatch({ type: actionTypes.VALIDATE_TOKEN });

  try {
    const res = await api.user.validation();
    const { data: { data: user }, headers } = res;

    await dispatch(setHeaders(headers));
    dispatch(userLogin(user));

    return res;
  } catch (error) {
    dispatch(notAuthenticate());

    // console.log(getStore())
    throw new Error(error);
  }
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

// TASKS
const loadUserContentTasksAsync = (page = 1) => async (dispatch) => {
  let res;

  try {
    res = await api.user.contentTasks(page);
    const { data, headers } = res;
    await dispatch(setHeaders(headers));
    dispatch(loadContentTasks({ ...data, page }));
  } catch (error) {
    console.log(error);
  }

  return res;
};

const getMoreUserContentTaskAsync = page => async (dispatch, getState) => {
  const tasksState = getState().user.tasks;
  const currentPage = (tasksState || {}).page;

  const itemsToGet = 4;
  const totalItems = (tasksState.meta || {}).total_items || 0;
  const maxPage = Math.round((totalItems/itemsToGet));

  const pageToGet = currentPage + 1;

  if(pageToGet <= maxPage) {
    const res = await dispatch(loadUserContentTasksAsync(pageToGet));
    dispatch(setHeaders(res.headers));
  }
}

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

// <--- END TASKS

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
    const { headers, data } = res;
    await dispatch(setHeaders(headers));
    await dispatch(storeQuizResult(data))
  } catch (error) {
    // console.log(error);
    throw new Error(error);
  }

  return res;
};

const removeQuizResult = () => async (dispatch) => {
    await dispatch(storeQuizResult(null))
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

// Favorites
const loadAllFavorites = (page = 1) => async (dispatch) => {
  try {
    const res = await api.user.getFavorites(page);
    const { headers, data } = res;

    await dispatch(setHeaders(headers));
    dispatch(setUserFavorites({ ...data, page }));

    return res;
  } catch (error) {
    // console.log(error)
    throw new Error(error);
  }
};

const storeAsFavoriteAsync = (neuronId, contentId) => async (dispatch) => {
  try {
    const res = await api.contents.storeAsFavorite(neuronId, contentId);
    const { headers } = res;

    dispatch(setHeaders(headers));
    return res;
  } catch (error) {
    // console.log(error);
    throw new Error(error);
  }
};

const getMoreFavoritesAsync = () => async (dispatch, getState) => {
  const favoriteState = getState().user.favorites;
  const currentPage = (favoriteState || {}).page;

  const itemsToGet = 4;
  const totalItems = (favoriteState.meta || {}).total_items || 0;
  const maxPage = Math.round((totalItems/itemsToGet));

  const pageToGet = currentPage + 1;

  if(pageToGet <= maxPage) {
    const res = await dispatch(loadAllFavorites(pageToGet));
    dispatch(setHeaders(res.headers));
  }
}

// <-- End Favorites

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
    await dispatch(getAchievementsAsync());
  } catch (error) {
    // console.log(error);
    Alert.alert('Error', 'Ups, tuvimos un error al intentar actualizar este item, intentalo más tarde por favor');
  }

  return res;
};

const updateSettingsAsync = settings => async (dispatch) => {
  /**
   * We need add {toUpdate: true} property to the format of the object to update:
   * eg. { toUpdate: true, kind: 'que-es', level: 1 }
   */

  const settingsToUpdate = (settings || [])
    .filter((setting) => (setting || {}).toUpdate);

  if(settingsToUpdate.length > 0) {
    const updateSettings = settingsToUpdate.map(async(setting) => {
      const settingUpdated = await api.preferences.update(setting.kind, setting.level);
      dispatch(setHeaders(settingUpdated.headers));

      return settingUpdated;
    })

    try {
      await Promise.all(updateSettings);
      const nomalizeSettings = (settings || []).map(setting => {
        if(setting.toUpdate) delete setting.toUpdate;
        return setting;
      });

      setCurrentSettings(nomalizeSettings);
      return { success: true };
    } catch (error) {
      throw new Error(error);
    }
  }

}

const setCurrentSettings = (settings = []) => (dispatch) => {
  dispatch(setSettings(settings));
}

const setCurrentPassiveMessageSettings = (passiveMessageSettings = {}) => async dispatch => {
  await AsyncStorage.setItem('passiveMessage', `${passiveMessageSettings.show}`);
  dispatch(setPassiveMessageSettings(passiveMessageSettings));
}

// Notes

const getStoreNotesAsync = (page = 1) => async dispatch => {
  try {
    const res = await api.user.getNotes(page);
    await dispatch(setHeaders(res.headers));
    dispatch(setNotes({...res.data, page }));

    return res.data;
  } catch (error) {
    throw new Error(error);
  }
}

const getMoreStoreNotesAsync = () => async (dispatch, getState) => {
  const notesState = getState().user.notes;
  const currentPage = (notesState || {}).page;

  const itemsToGet = 2;
  const totalItems = (notesState.meta || {}).total_items || 0;
  const maxPage = Math.round((totalItems/itemsToGet));

  const pageToGet = currentPage + 1;

  if(pageToGet <= maxPage) {
    const res = await dispatch(getStoreNotesAsync(pageToGet));
    dispatch(setHeaders(res.headers));
  }
}

// Notifications

const getNotificationsAsync = (page = 1) => async (dispatch) => {
  try {
    const res = await api.notifications.getNotifications(page);

    await dispatch(setHeaders(res.headers));
    dispatch(setNotifications({ ...res.data, page }));
    return res.data;
  } catch (error) {
    throw new Error(error);
  }
}

const getNotificationDetailsAsync = () => async (dispatch) => {
  try {
    const res = await api.notifications.getNotificationDetails();
    await dispatch(setHeaders(res.headers));
    const data = res.data || {};
    const {
      contents_to_learn: contentsToLearn = 0,
      notifications = 0
    } = data;
    const total = contentsToLearn + notifications;
    dispatch(setNotificationDetails({ ...res.data, contentsToLearn, total}));
    return res.data;
  } catch (error) {
    throw new Error(error);
  }
}

const loadMoreNotificationsAsync = () => async (dispatch, getState) => {

  const notificationsState = getState().user.notifications;
  const currentPage = (notificationsState || {}).page;
  const pageToGet = currentPage + 1;
  const maxPage = (notificationsState.meta || {}).total_pages || 1;

  if(pageToGet <= maxPage) {
    const res = await dispatch(getNotificationsAsync(pageToGet));
    dispatch(setHeaders(res.headers));
  }
}

const readNotificationAsync = (id) => async (dispatch) => {
  try {
    const res = await api.notifications.readNotificationById(id);

    dispatch(setHeaders(res.headers));
    return res;
  } catch (error) {
    throw new Error(error);
  }
}

const deleteNotification = (id) => (dispatch) => {
  dispatch({ type: actionTypes.DELETE_NOTIFICATIONS, payload: id });
  dispatch({ type: actionTypes.DECREASE_NOTIFICATION_DETAILS_COUNTER });
}

const increaseNotificationCounter =() => (dispatch) => {
  dispatch({ type: actionTypes.INCREASE_NOTIFICATION_DETAILS_COUNTER });
}

const loadExternalQuizAsync = (quizId, playerId) => async (dispatch) => {
  try {
    const res = await api.players.getQuizForPlayer(quizId, playerId);
    const { data, headers } = res;

    dispatch({ type: actionTypes.STORE_EXTERNAL_QUIZ, payload: data });
    dispatch(setHeaders(headers));
    return res;
  } catch (error) {
    throw new Error(error);
  }
};

const evaluateQuizAsync = (quizId, playerId, answers) => async (dispatch) => {
  try {
    const res = await api.players.evaluateQuiz(quizId, playerId, answers);
    const { headers } = res;

    dispatch(setHeaders(headers));
    return res;
  } catch (error) {
    throw new Error(error);
  }
};

const loadFinalTestAsync = (testId) => async (dispatch) => {

  try {
    let res = {};
    if(!!testId) {
      const resQuestionsById = await api.players.getTestById(testId)
      //FIXME: la data del GET llega distinta a la data del POST
      res = { data: { questions: resQuestionsById.data }, headers: resQuestionsById.headers }
    } else {
      res = await api.players.getFinalTest();
    }

    dispatch(storeQuiz(res.data.questions));
    dispatch(setHeaders(res.headers));
    return res;
  } catch (error) {
    throw new Error(error);
  }
}

const evaluateFinalTestAsync = (finalTestId, answers) => async (dispatch) => {
  try {
    const res = await api.players.evaluateFinalTest(finalTestId, answers);
    const { headers } = res;

    dispatch(setHeaders(headers));
    return res;
  } catch (error) {
    throw new Error(error);
  }
};

const saveResultFinalTest = (finalTestResult) => async (dispatch) => {
  dispatch(storeFinalTestResult(finalTestResult));
}

const saveCertificateAsync = (certificateURL) => async (dispatch) => {
  try {
    const res = await api.players.saveCertificate(certificateURL);
    const { headers } = res;

    dispatch(setHeaders(headers));
    return res;
  } catch (error) {
    throw new Error(error);
  }
}

const uploadImageAsync = (base64Image) => async (dispatch) => {
  try{
    const res = await api.cloudinary.uploadImage(base64Image);
    return res;
  } catch (error) {
		console.log("​error", error)
    throw new Error(error);
  }
}

const getLatestCertificatesAsync = () => async (dispatch) => {
  try{
    const res = await api.players.getLatestCertificates();
  const { headers, data } = res;
    dispatch(setHeaders(headers));
    return data;
  } catch (error) {
		console.log("​error", error)
    throw new Error(error);
  }
}

const uploadTreeImageAsync = (base64Image) => async (dispatch) => {
  try{
    const res = await api.tree_image.uploadTreeImage(base64Image);
    return res;
  } catch (error) {
		console.log("​error", error)
    throw new Error(error);
  }
}

const setReloadRandomContents = (reload = true) => (dispatch) => {
  dispatch(reloadRandomContents(reload))
}

const getEventsTodayAsync = () => async (dispatch) => {
  try {
    const res = await api.events.getEventsToday();
    const { headers, data } = res;
    dispatch(setHeaders(headers));
    return data;
  } catch (error) {
    throw new Error(error);
  }
}

const getEventsWeekAsync = () => async (dispatch) => {
  try {
    const res = await api.events.getEventsWeek();
    const { headers, data } = res;
    await dispatch(setHeaders(headers));
    await dispatch(storeEventsWeek(data));
    return data;
  } catch (error) {
    throw new Error(error);
  }
}

const getEventsAsync = () => async (dispatch) => {
  try {
    const res = await api.events.getEvents();
    const { headers, data } = res;
    await dispatch(setHeaders(headers));
    return data;
  } catch (error) {
    throw new Error(error);
  }
}

const takeEventAsync = (eventId) => async (dispatch) => {
  try {
    const res = await api.events.takeEvent(eventId);
    const { headers, data } = res;
    dispatch(setHeaders(headers));
    return data;
  } catch (error) {
    throw new Error(error);
  }
}

const takeSuperEventAsync = (eventId) => async (dispatch) => {
  try {
    const res = await api.events.takeSuperEvent(eventId);
    const { headers, data } = res;
    dispatch(setHeaders(headers));
    return data;
  } catch (error) {
    throw new Error(error);
  }
}

const getEventInProgressAsync = () => async (dispatch) => {
  try {
    const res = await api.events.getEventInProgress();
    const { headers, data } = res;
    await dispatch(setHeaders(headers));
    await dispatch(storeEvents(data.contents));
    return data.contents;
  } catch (error) {
    throw new Error(error);
  }
}

const getContentsToLearnAsync = (page = 1) => async (dispatch) => {
  let res;

  try {
    const res = await api.user.getContentsToLearn(page);
    const { data, headers } = res;
    await dispatch(setHeaders(headers));
    dispatch(storeContentsToLearn({ ...data, page }));
  } catch (error) {
    console.log(error);
  }

  return res;
};

const getMoreContentsToLearnAsync = () => async (dispatch, getState) => {
  const contentsToLearnState = getState().user.contentsToLearn;
  const currentPage = (contentsToLearnState || {}).page;

  const itemsToGet = 4;
  const totalItems = (contentsToLearnState.meta || {}).total_items || 0;
  const maxPage = Math.ceil((totalItems/itemsToGet));

  const pageToGet = currentPage + 1;

  if(pageToGet <= maxPage) {
    await dispatch(getContentsToLearnAsync(pageToGet));
  }
}

const generateShareDataAsync = (titulo, descripcion, uri, imagen_url) => async (dispatch) => {
  try {
    const res = await api.sharings.sharings(titulo, descripcion, uri, imagen_url);
    const { headers, data } = res;
    await dispatch(setHeaders(headers));
    return data;
  } catch (error) {
    throw new Error(error);
  }
}

export default {
  loginAsync,
  registerAsync,
  validateToken,
  logoutAsync,
  loadUserContentTasksAsync,
  getMoreUserContentTaskAsync,
  storeTaskAsync,
  readContentAsync,
  learnContentsAsync,
  storeNotesAsync,
  setNotes,
  loadAllFavorites,
  setUserFavorites,
  storeAsFavoriteAsync,
  getMoreFavoritesAsync,
  getUserProfileAsync,
  updateUserAccountAsync,
  getAchievementsAsync,
  updateAchievementsAsync,
  signOutAsync,
  setCurrentSettings,
  setCurrentPassiveMessageSettings,
  showPassiveMessageAsync,
  updateSettingsAsync,
  getNotificationsAsync,
  getNotificationDetailsAsync,
  getStoreNotesAsync,
  getMoreStoreNotesAsync,
  loadMoreNotificationsAsync,
  readNotificationAsync,
  deleteNotification,
  loadExternalQuizAsync,
  evaluateQuizAsync,
  loadFinalTestAsync,
  evaluateFinalTestAsync,
  saveResultFinalTest,
  saveCertificateAsync,
  uploadImageAsync,
  uploadTreeImageAsync,
  getLatestCertificatesAsync,
  setReloadRandomContents,
  getEventsTodayAsync,
  takeEventAsync,
  takeSuperEventAsync,
  getEventInProgressAsync,
  getEventsWeekAsync,
  getEventsAsync,
  removeQuizResult,
  generateShareDataAsync,
  getContentsToLearnAsync,
  getMoreContentsToLearnAsync,
  resetData,
  increaseNotificationCounter,
};
