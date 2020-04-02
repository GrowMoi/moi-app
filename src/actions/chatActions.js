import * as actionTypes from './actionTypes';

export const showChatModal = () => dispatch => {
  dispatch({
    type: actionTypes.SHOW_CHAT_MODAL,
  })
}

export const hiddenChatModal = () => dispatch => {
  dispatch({
    type: actionTypes.HIDDEN_CHAT_MODAL,
  })
}