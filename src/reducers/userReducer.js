import { combineReducers } from 'redux';
import * as actionTypes from '../actions/actionTypes';

const initialState = {
  userData: {
    profile: {},
    headers: {},
    authenticate: false,
  },
  tasks: {},
  quiz: null,
};

const userData = (state = initialState.userData, action = {}) => {
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

const tasks = (state = initialState.tasks, action = {}) => {
  switch (action.type) {
    case actionTypes.GET_USER_CONTENT_TASKS:
      return action.payload;
    default:
      return state;
  }
};

const quiz = (state = initialState.quiz, action = {}) => {
  switch (action.type) {
    case actionTypes.STORE_QUIZ:
      return action.payload;
    default:
      return state;
  }
};

const user = combineReducers({
  userData,
  tasks,
  quiz,
});

export default user;
