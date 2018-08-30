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

const setSettings = settings => ({
  type: actionTypes.SET_SETTINGS,
  payload: settings,
})

const signOutAsync = () => async (dispatch) => {
  await dispatch(signOut());
  Actions.login();
}

const setNotifications = (notifications) => ({
  type: actionTypes.SET_NOTIFICATIONS,
  payload: notifications,
})

const setNotes = (notes) => ({
  type: actionTypes.SET_USER_NOTES,
  payload: notes,
})

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

const registerAsync = ({ username, email, age, school, country, city, authorization_key: authorizationKey, onPressAlert }) => async (dispatch) => {
  try {
    const res = await api.user.register({ username, email, age, school, country, city, authorization_key: authorizationKey });
    const { data: { data: user }, headers } = res;

    await dispatch(setHeaders(headers));

    Alert.alert(
      `Bienvenido ${username} a Moi`,
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

const validateToken = () => async (dispatch) => {
  dispatch({ type: actionTypes.VALIDATE_TOKEN });

  try {
    const res = await api.user.validation();
    const { data: { data: user }, headers } = res;

    await dispatch(setHeaders(headers));
    dispatch(userLogin(user));

    return res;
  } catch (error) {
    dispatch(notAuthenticate());
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

const loadUserContentTasksAsync = page => async (dispatch) => {
  let res;

  console.log('LOAD USER CONTENT TASKS');
  try {
    res = await api.user.contentTasks(page);
    const { data, headers } = res;
    await dispatch(setHeaders(headers));
    dispatch(loadContentTasks(data));
  } catch (error) {
    console.log(error);
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
  try {
    const res = await api.user.getFavorites(page);
    const { headers, data } = res;

    await dispatch(setHeaders(headers));
    dispatch(setUserFavorites(data));

    return data;
  } catch (error) {
    // console.log(error)
    throw new Error(error);
  }
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

const getNotificationsAsync = (page = 1) => async (dispatch) => {
  console.log('NOTIFICATIONS');

  try {
    const res = await api.notifications.getNotifications(page);

    await dispatch(setHeaders(res.headers));
    dispatch(setNotifications(res.data));
    return res.data;
  } catch (error) {
    throw new Error(error);
  }
}

const getStoreNotesAsync = (page = 1) => async dispatch => {
  try {
    const res = await api.user.getNotes(page);

    await dispatch(setHeaders(res.headers));
    dispatch(setNotes(res.data));
    return res.data;
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
  storeTaskAsync,
  readContentAsync,
  learnContentsAsync,
  storeNotesAsync,
  setNotes,
  loadAllFavorites,
  setUserFavorites,
  storeAsFavoriteAsync,
  getUserProfileAsync,
  updateUserAccountAsync,
  getAchievementsAsync,
  updateAchievementsAsync,
  signOutAsync,
  setCurrentSettings,
  updateSettingsAsync,
  getNotificationsAsync,
  getStoreNotesAsync,
};
