import { combineReducers } from 'redux';
import { LOAD_USER_TREE } from './../actions/treeActions';

const initialState = {
  userTree: {},
};

const userTree = (state = initialState.userTree, action = {}) => {
  switch (action.type) {
    case LOAD_USER_TREE:
      return action.payload;
    default:
      return state;
  }
};

const tree = combineReducers({
  userTree,
});

export default tree;
