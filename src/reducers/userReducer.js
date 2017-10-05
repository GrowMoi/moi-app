// import { combineReducers } from 'redux';
import * as actionTypes from '../actions/actionTypes';

const initialState = {
  user: {},
  authenticate: false,
};

const user = (state = initialState, action = {}) => {
  switch (action.type) {
    case actionTypes.AUTH_VALID:
      return {
        ...state,
        user: action.payload,
        authenticate: true,
      };
    case actionTypes.AUTH_NOTVALID:
      return state;
    default:
      return state;
  }
};

export default user;
