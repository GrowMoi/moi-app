import * as actionTypes from './actionTypes';
import { Alert } from 'react-native';
import api from '../api';
import _ from 'lodash';

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

    const userChats = ((res.data || {}).user_chats || []);
    const formattedChats = {};
    userChats.forEach(chat => {
      formattedChats[chat.id] = chat;
    });

    dispatch({
      type: actionTypes.GET_CURRENT_CHAT_MESSAGES,
      payload: formattedChats,
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

export const sendMessage = ({ message, receiver_id, room_chat_id }) => async (dispatch, getState) => {
  const user = getState().user.profile;
  const messagesInfo = getState().usersChat.chat.current.messages;
  const tempID = _.uniqueId('temp_');
  const date = new Date();
  const time = date.getTime();

  const tempMessage = {
    "chat_with": (messagesInfo[0] || {}).chat_with,
    "created_at": time,
    "id": tempID,
    "kind": 'outgoing',
    "message": message,
    "receiver_id": receiver_id,
    "sender_id": user.id,
    "room_chat_id": room_chat_id,
    "sender_user": {
      "avatar": user.avatar,
      "email": user.email,
      "id": user.id,
      "image": user.image,
      "name": user.name,
      "username": user.username,
    },
    "type": 'user',
  }

  dispatch({
    type: actionTypes.WAITING_TO_SEND_MESSAGE,
    payload: tempMessage,
  });

  try {
    const res = await api.user.sendChatMessage({ message, receiver_id, room_chat_id })

    dispatch({
      type: actionTypes.SEND_CHAT_MESSAGE,
      payload: { message: res.data.user_chat, tempMessageID: tempID },
    });

    return res;
  } catch (error) {
    dispatch({
      type: actionTypes.ERROR_TO_SEND_MESSAGE,
      payload: { error: error.message, tempMessageID: tempID },
    })
    throw new Error(error);
  }
}

export const startChat = (receiver_id) => async dispatch => {
  dispatch({
    type: actionTypes.STARTING_CHAT,
  });

  try {
    const res = await api.user.startChat({ receiver_id });
    dispatch({
      type: actionTypes.START_CHAT,
      payload: res.data,
    });
    return res;
  } catch (error) {
    dispatch({
      type: actionTypes.ERROR_TO_START_CHAT,
      payload: error.message,
    });
    return error
  }
}

export const leaveChat = (room_chat_id) => async dispatch => {
  dispatch({
    type: actionTypes.LEAVING_CHAT,
  });

  try {
    const res = await api.user.leaveChat({ room_chat_id });
    dispatch({
      type: actionTypes.LEFT_CHAT,
      payload: res.data,
    });

    return res;
  } catch (error){
    dispatch({
      type: actionTypes.ERROR_LEAVING,
      payload: error,
    });

    throw error
  }
}