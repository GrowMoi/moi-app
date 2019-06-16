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
  externalQuiz: null,
  finalTestResult: null,
  achievements: [],
  settings: [],
  passiveMessageSettings: {
      show: true,
  },
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
  events: [],
  eventsWeek: [],
  drawerState: {},
  quizResult: null,
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
      const tasks = [
        ...(((state || {}).content_tasks || {}).content_tasks || []),
        ...(((action.payload || {}).content_tasks || {}).content_tasks || []),
      ];

      const cleanTasks = object.removeDuplicates(tasks, 'id');
      const newTasksState = {
        meta: action.payload.meta,
        content_tasks: {
          ...((action.payload || {}).content_tasks || {}),
          content_tasks: cleanTasks,
        },
        page: action.payload.page,
      };

      return newTasksState;
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

const externalQuiz = (state = initialState.externalQuiz, action = {}) => {
  switch (action.type) {
    case actionTypes.STORE_EXTERNAL_QUIZ:
      return action.payload;
    default:
      return state;
  }
};

const quizResult = (state = initialState.quizResult,  action = {}) => {
  switch (action.type) {
    case actionTypes.STORE_QUIZ_RESULT:
      return action.payload;
    default:
      return state;
  }
};

const finalTestResult = (state = initialState.finalTestResult, action = {}) => {
  switch (action.type) {
    case actionTypes.STORE_FINAL_TEST_RESULT:
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

const achievements = (state = initialState.achievements, action) => {
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

const passiveMessageSettings = (state = initialState.passiveMessageSettings, action) => {
  switch (action.type) {
    case actionTypes.SET_PASSIVE_MESSAGE_SETTINGS:
      console.log("TCL: passiveMessageSettings -> action.payload", action.payload)
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
      let updatedMeta = state.meta;
      updatedMeta.total_count--;

      return {
        ...state,
        meta: updatedMeta,
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

const reloadRandomContents = (state = false, action) => {
  switch (action.type) {
    case actionTypes.SET_RELOAD_RANDOM_CONTENTS:
      return action.payload;
    default:
      return state;
  }
}

const events = (state = initialState.events, action) => {
  switch (action.type) {
    case actionTypes.STORE_EVENTS:
      return action.payload;
    default:
      return state;
  }
}

const eventsWeek = (state = initialState.eventsWeek, action) => {
  switch (action.type) {
    case actionTypes.STORE_EVENTS_WEEK:
      return action.payload;
    default:
      return state;
  }
}

const drawerState = (state = initialState.drawerState, action) => {
  switch (action.type) {
    case actionTypes.STORE_DRAWER_STATE:
      return {
        isOpen: action.payload
      };
    default:
      return state;
  }
}


const user = combineReducers({
  userData,
  tasks,
  quiz,
  externalQuiz,
  favorites,
  profile,
  achievements,
  settings,
  passiveMessageSettings,
  notifications,
  notes,
  finalTestResult,
  reloadRandomContents,
  events,
  eventsWeek,
  drawerState,
  quizResult,
});

export default user;
