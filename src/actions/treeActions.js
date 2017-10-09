import api from '../api';
import * as actionTypes from './actionTypes';

const loadUserTree = tree => ({
  type: actionTypes.LOAD_USER_TREE,
  payload: tree,
});

const loadTreeAsync = () => async (dispatch) => {
  const res = await api.trees.getTree();
  dispatch(loadUserTree(res.data));
  return res;
};

export default {
  loadTreeAsync,
};
