import api from '../api';
import { setHeaders } from './headerActions';

const setCurrentPreferencesAsync = (kind, level) => async (dispatch) => {
  let res;
  try {
    res = await api.preferences.update(kind, level);
    dispatch(setHeaders(res.headers));
  } catch (error) {
    // console.log(error)
  }
  return res;
};

export default {
  setCurrentPreferencesAsync,
};
