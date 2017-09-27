import { combineReducers } from 'redux';
import * as actionTypes from '../actions/actionTypes';

const initialState = {
  userTree: {},
};

const userTree = (state = initialState.userTree, action = {}) => {
  switch (action.type) {
    case actionTypes.LOAD_USER_TREE:
      return action.payload;
    default:
      return state;
  }
};

const tree = combineReducers({
  userTree,
});

export default tree;
