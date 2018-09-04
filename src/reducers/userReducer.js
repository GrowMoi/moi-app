import { combineReducers } from 'redux';
import { object } from '../commons/utils';
import * as actionTypes from '../actions/actionTypes';

const initialState = {
  userData: {
    profile: {},
    headers: {},
    authenticate: false,
  },
  data: {},
  favorites: {},
  tasks: {},
  quiz: null,
  achievements: [],
  settings: [],
  notifications: {
    notifications: [],
    meta: {},
    page: 1,
  },
  notes: {
    content_notes: {},
    meta: {},
    page: 1,
  },
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
      const favorites = [
        ...(((state || {}).content_tasks || {}).content_tasks || []),
        ...(((action.payload || {}).content_tasks || {}).content_tasks || []),
      ];

      const cleanFavorites = object.removeDuplicates(favorites, 'id');
      const newFavoritesState = {
        meta: action.payload.meta,
        content_tasks: {
          ...((action.payload || {}).content_tasks || {}),
          content_tasks: cleanFavorites,
        },
        page: action.payload.page,
      };

      return newFavoritesState;
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

const notifications = (state = initialState.notifications, action) => {
  switch (action.type) {
    case actionTypes.SET_NOTIFICATIONS:

      const notifications = [...state.notifications, ...action.payload.notifications];
      const cleanNotifications = object.removeDuplicates(notifications, 'id');

      return {
        meta: action.payload.meta,
        notifications: cleanNotifications,
        page: action.payload.page,
      };

    case actionTypes.DELETE_NOTIFICATIONS:
      const id = action.payload;
      const deletedNotification = state.notifications.filter(item => item.id !== id);

      return {
        ...state,
        notifications: deletedNotification,
      };

    default:
      return state;
  }
}

const notes = (state = initialState.notes, action) => {
  switch (action.type) {
    case actionTypes.SET_USER_NOTES:
      const notes = [
        ...((state.content_notes).content_notes || []),
        ...(((action.payload || {}).content_notes || {}).content_notes || []),
      ];

      const cleanNotes = object.removeDuplicates(notes, 'id');
      const newState = {
        ...action.payload,
        content_notes: {
          ...action.payload.content_notes,
          content_notes: cleanNotes,
        }
      }

      return newState;
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
  notifications,
  notes,
});

export default user;
