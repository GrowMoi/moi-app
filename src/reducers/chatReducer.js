import { combineReducers } from 'redux';
import * as actionTypes from '../actions/actionTypes';

const initialState = {
  chatIsVisible: false,
  current: {
    receiver_id: null,
    user_id: null,
    messages: [],
  }
};

const chat = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SHOW_CHAT_MODAL:
      return {
        ...state,
        chatIsVisible: true,
        current: {
          receiver_id: action.payload.receiver_id,
          user_id: action.payload.user_id,
        }
      };
    case actionTypes.HIDDEN_CHAT_MODAL:
      return { ...state, chatIsVisible: false, current: { ...initialState.current } };
    case actionTypes.GET_CURRENT_CHAT_MESSAGES:
      return { ...state, current: { ...state.current, messages: action.payload } }
    default:
      return state;
  }
};

export default combineReducers({
  chat,
});
