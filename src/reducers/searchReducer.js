import { combineReducers } from 'redux';
import * as actionTypes from '../actions/actionTypes';

const initialState = {
  contentResults: [],
  friendResults: [],
};

const contents = (state = initialState.contentResults, action = {}) => {
  switch (action.type) {
    case actionTypes.GET_CONTENTS_RESULT:
      return action.payload;
    default:
      return state;
  }
};

const friends = (state = initialState.contentResults, action = {}) => {
  switch (action.type) {
    case actionTypes.GET_FRIEND_RESULT:
      return action.payload;
    default:
      return state;
  }
};

export default combineReducers({
  contents,
  friends,
});
