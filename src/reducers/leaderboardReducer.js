import { combineReducers } from 'redux';
import _ from 'lodash'
import * as actionTypes from '../actions/actionTypes';

const initialState = {
  leaders: [],
  meta: {},
  type: ''
};

const leaders = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_LEADERBOARD:
      const leaders = action.payload.page === 1 ? action.payload.leaders : _.uniqBy([...state.leaders, ...action.payload.leaders], 'id');

      return {
        meta: action.payload.meta,
        leaders,
        page: action.payload.page,
      };
    default:
      return state;
  }
};

export default combineReducers({
  leaders,
});
