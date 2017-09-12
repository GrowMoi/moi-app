import api from '../api';

export const LOAD_USER_TREE = 'LOAD_USER_TREE';

const loadUserTree = treeInfo => ({
  type: LOAD_USER_TREE,
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
