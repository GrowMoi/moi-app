import { combineReducers } from 'redux';
import * as actionTypes from '../actions/actionTypes';

const initialState = {
  chatIsVisible: false,
};

const chat = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SHOW_CHAT_MODAL:
      return { ...state, chatIsVisible: true };
    case actionTypes.HIDDEN_CHAT_MODAL:
      return { ...state, chatIsVisible: false };
    default:
      return state;
  }
};

export default combineReducers({
  chat,
});
