import api from '../api';
import * as actionTypes from './actionTypes';
import { setHeaders } from './headerActions';

const setContents = contents => ({
  type: actionTypes.GET_CONTENTS_RESULT,
  payload: contents,
});

const setUsersResult = users => ({
  type: actionTypes.GET_USERS_RESULT,
  payload: users,
});

const getContentsAsync = (page, query) => async (dispatch) => {
  let res;
  try {
    res = await api.search.getContents(page, query);
    const { headers, data } = res;

    dispatch(setHeaders(headers));
    dispatch(setContents(data.search.contents));
  } catch (error) {
    // console.log(error);
  }

  return res;
};

const getUsersAsync = (page, query) => async (dispatch, getState) => {
  console.log("TCL: getUsersAsync -> page", page)
  let res;
  try {
    res = await api.search.getUsers(page, query);
    const { headers, data } = res;

    let friends = data.search_users.users;

    if(page > 1) {
        const prevFriends = getState().search.friends;
        friends = [...prevFriends, ...friends];
    }

    dispatch(setHeaders(headers));
    dispatch(setUsersResult(friends));
  } catch (error) {
    // console.log(error)
  }
};

export default {
  getContentsAsync,
  getUsersAsync,
};
