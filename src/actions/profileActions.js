import api from '../api';
import * as actionTypes from './actionTypes';
import { setHeaders } from './headerActions';

const loadProfile = profile => ({
  type: actionTypes.GET_PUBLIC_PROFILE,
  payload: profile,
});

const loadProfileAsync = username => async (dispatch) => {
  let res;
  try {
    res = await api.profiles.getProfile(username);

    dispatch(setHeaders(res.headers));
    dispatch(loadProfile(res.data));
  } catch (error) {
    // console.log(error)
  }

  return res;
};

export default {
  loadProfileAsync,
};
