import { combineReducers } from 'redux';
import * as actionTypes from '../actions/actionTypes';

const initialState = {
  chat: {
    chatIsVisible: false,
    current: {
      receiver_id: null,
      room_chat_id: null,
      user_id: null,
      messages: [],
    },
    loading: false,
    error: null,
  },

  currentMessageState: {
    message: {},
    waiting: false,
    error: null
  }
};

const chat = (state = initialState.chat, action) => {
  switch (action.type) {
    case actionTypes.START_CHAT:
      return {
        ...state,
        current: {
          ...state.current,
          room_chat_id: action.payload.id,
        }
      }
    case actionTypes.SHOW_CHAT_MODAL:
      return {
        ...state,
        chatIsVisible: true,
        current: {
          ...state.current,
          receiver_id: action.payload.receiver_id,
          user_id: action.payload.user_id,
        }
      };
    case actionTypes.HIDDEN_CHAT_MODAL:
      return { ...state, chatIsVisible: false, current: { ...initialState.chat.current } };
    case actionTypes.GET_CURRENT_CHAT_MESSAGES:
      return { ...state, current: { ...state.current, messages: action.payload }, loading: false, error: null }
    case actionTypes.FETCHING_CHAT_MESSAGES:
      return { ...state, loading: true };
    case actionTypes.ERROR_USER_CHAT:
      return { ...state, loading: false, error: action.payload };

    case actionTypes.SEND_CHAT_MESSAGE:
      delete state.current.messages[action.payload.tempMessageID];

      return {
        ...state,
        current: {
          ...state.current,
          messages: {
            ...state.current.messages,
            [action.payload.message.id]: action.payload.message
          }
        }
      };
    case actionTypes.WAITING_TO_SEND_MESSAGE:
      return {
        ...state,
        current: {
          ...state.current,
          messages: {
            ...state.current.messages,
            [action.payload.id]: action.payload,
          }
        }
      };
    case actionTypes.ERROR_TO_SEND_MESSAGE:
      delete state.current.messages[action.payload.tempMessageID]
      return state;
    default:
      return state;
  }
};

const currentMessageState = (state = initialState.currentMessageState, action) => {
  switch(action.type) {
    case actionTypes.SEND_CHAT_MESSAGE:
      return { ...state, waiting: false, message: {} };
    case actionTypes.WAITING_TO_SEND_MESSAGE:
      return { ...state, waiting: true, message: action.payload };
    case actionTypes.ERROR_TO_SEND_MESSAGE:
      return { ...state, waiting: false, error: action.payload.error };
    default:
      return state;
  }
}

export default combineReducers({
  chat,
  currentMessageState,
});
