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

const getUsersAsync = (page, query) => async (dispatch) => {
  let res;
  try {
    res = await api.search.getUsers(page, query);
    const { headers, data } = res;

    dispatch(setHeaders(headers));
    dispatch(setUsersResult(data.search_users.users));
  } catch (error) {
    // console.log(error)
  }
};

export default {
  getContentsAsync,
  getUsersAsync,
};
