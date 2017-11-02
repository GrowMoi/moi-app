import api from '../api';
import * as actionTypes from './actionTypes';
import allLevels from '../mocks/allLevels';
import env from '../../environment';

const loadUserTree = tree => ({
  type: actionTypes.LOAD_USER_TREE,
  payload: tree,
});

const loadTreeAsync = () => async (dispatch) => {
  if (env.MOCK_LEVELS) {
    dispatch(loadUserTree(allLevels));
    return allLevels;
  }

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
