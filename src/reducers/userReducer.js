// import { combineReducers } from 'redux';
import * as actionTypes from '../actions/actionTypes';

const initialState = {
  profile: {},
  headers: {},
  authenticate: false,
};

const user = (state = initialState, action = {}) => {
  switch (action.type) {
    case actionTypes.LOGIN:
      return {
        ...state,
        profile: action.user,
        headers: action.headers,
        authenticate: true,
      };
    case actionTypes.AUTH_NOTVALID:
      return state;
    default:
      return state;
  }
};

export default user;
