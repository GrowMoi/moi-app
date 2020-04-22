import * as actionTypes from './actionTypes';
import { Alert } from 'react-native';
import api from '../api';

export const showChatModal = (options = {}) => dispatch => {
  dispatch({
    type: actionTypes.SHOW_CHAT_MODAL,
    payload: options,
  })
}

export const hiddenChatModal = () => dispatch => {
  dispatch({
    type: actionTypes.HIDDEN_CHAT_MODAL,
  })
}

export const getMessages = ({ receiver_id, user_id }) => async dispatch => {
  dispatch({
    type: actionTypes.FETCHING_CHAT_MESSAGES,
  })

  try {
    const res = await api.user.getChatMessages({ receiver_id, user_id });

    dispatch({
      type: actionTypes.GET_CURRENT_CHAT_MESSAGES,
      payload: ((res.data || {}).user_chats || []),
    })
    return res
  } catch (error) {
    // Alert.alert('Ocurrio un error al obtener los mensajes del chat.')
    dispatch({
      type: actionTypes.ERROR_USER_CHAT,
      payload: error.message,
    })
    throw new Error(error)
  }
}

export const sendMessage = ({ message, receiver_id }) => async dispatch => {
  try {
    const res = await api.user.sendChatMessage({ message, receiver_id })
    dispatch({
      type: actionTypes.SEND_CHAT_MESSAGE,
    })

    return res;
  } catch (error) {
    throw new Error(error);
  }
}