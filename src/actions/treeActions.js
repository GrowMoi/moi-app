import api from '../api';
import * as actionTypes from './actionTypes';

const loadUserTree = tree => ({
  type: actionTypes.LOAD_USER_TREE,
  payload: tree,
});

const loadTreeAsync = () => async (dispatch) => {
  let res;
  try {
    res = await api.trees.getTree();
    dispatch(loadUserTree(res.data));
  } catch (error) {
    // console.log(error)
  }

  return res;
};

export default {
  loadTreeAsync,
};
