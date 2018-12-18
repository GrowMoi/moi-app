import api from '../api';
import { setHeaders } from './headerActions';

const setCurrentPreferencesAsync = (kind, level) => async (dispatch) => {
  try {
    const res = await api.preferences.update(kind, level);
    dispatch(setHeaders(res.headers));
  } catch (error) {
    throw new Error(error);
  }
};

export default {
  setCurrentPreferencesAsync,
};
