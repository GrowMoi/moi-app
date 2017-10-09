import api from '../api';
import * as actionTypes from './actionTypes';

const loadUserTree = tree => ({
  type: actionTypes.LOAD_USER_TREE,
  payload: tree,
});

const loadTreeAsync = () => async (dispatch) => {
  const tree = await api.trees.getTree();
  dispatch(loadUserTree(tree));
  return tree;
};

export default {
  loadTreeAsync,
};
