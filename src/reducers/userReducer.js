import { combineReducers } from 'redux';
import * as actionTypes from '../actions/actionTypes';

const initialState = {
  userData: {
    profile: {},
    headers: {},
    authenticate: false,
  },
  data: {},
  favorites: null,
  tasks: {},
  quiz: null,
  achievements: [],
  settings: [],
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
      return initialState.userData;
    case actionTypes.LOGOUT:
      return initialState.userData;
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

const favorites = (state = initialState.favorites, action) => {
  switch (action.type) {
    case actionTypes.LOAD_USER_FAVORITES:
      return action.payload;
    default:
      return state;
  }
};

const profile = (state = initialState.data, action) => {
  switch (action.type) {
    case actionTypes.GET_USER_PROFILE:
      return action.payload;
    default:
      return state;
  }
};

const achievements = (state = initialState.data, action) => {
  switch (action.type) {
    case actionTypes.GET_USER_ACHIEVEMENTS:
      return action.payload;
    default:
      return state;
  }
};

const settings = (state = initialState.settings, action) => {
  switch (action.type) {
    case actionTypes.SET_SETTINGS:
      return action.payload;
    default:
      return state;
  }
}

const user = combineReducers({
  userData,
  tasks,
  quiz,
  favorites,
  profile,
  achievements,
  settings,
});

export default user;
