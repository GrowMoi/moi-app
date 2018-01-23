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

    dispatch(setContents(data.search.contents));
    dispatch(setHeaders(headers));
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

    dispatch(setUsersResult(data.search_users.users));
    dispatch(setHeaders(headers));
  } catch (error) {
    // console.log(error)
  }
};

export default {
  getContentsAsync,
  getUsersAsync,
};
