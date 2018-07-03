import api from '../api';
import * as actionTypes from './actionTypes';
import allLevels from '../mocks/allLevels';
import env from '../../environment';
import { setHeaders } from './headerActions';

const loadUserTree = tree => ({
  type: actionTypes.LOAD_USER_TREE,
  payload: tree,
});

const loadTreeAsync = (username, isPublic = false) => async (dispatch, getState) => {
  if (env.MOCK_LEVELS) {
    dispatch(loadUserTree(allLevels));
    return allLevels;
  }

  const currentUsername = username || getState().user.userData.profile.username;
  try {
    const res = await api.trees.getTree(currentUsername);

    if (!isPublic) {
      dispatch(setHeaders(res.headers));
      dispatch(loadUserTree(res.data));
    }

    return res;
  } catch (error) {
    throw new Error(error);
  }
};

export default {
  loadTreeAsync,
};
