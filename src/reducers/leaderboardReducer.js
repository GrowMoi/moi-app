import { combineReducers } from 'redux';
import * as actionTypes from '../actions/actionTypes';

const initialState = {
  leaders: [],
  meta: {},
};

const leaders = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_LEADERBOARD:
      return action.payload;
    default:
      return state;
  }
};

export default combineReducers({
  leaders,
});
