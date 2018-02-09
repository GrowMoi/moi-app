import api from '../api';
import * as actionTypes from './actionTypes';

const loadProfile = profile => ({
  type: actionTypes.GET_PUBLIC_PROFILE,
  payload: profile,
});

const loadProfileAsync = username => async (dispatch) => {
  let res;
  try {
    res = await api.profiles.getProfile(username);
    dispatch(loadProfile(res.data));
  } catch (error) {
    // console.log(error)
  }

  return res;
};

export default {
  loadProfileAsync,
};
