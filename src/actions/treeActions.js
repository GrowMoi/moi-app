import api from '../api';
import * as actionTypes from './actionTypes';

const loadUserTree = treeInfo => ({
  type: actionTypes.LOAD_USER_TREE,
  payload: treeInfo,
});

const loadTreeAsync = userId => async (dispatch) => {
  const level = await api.user.getUserTree(userId);
  dispatch(loadUserTree(level));
  return level;
};

export default {
  loadTreeAsync,
};
