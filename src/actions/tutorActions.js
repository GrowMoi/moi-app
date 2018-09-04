import api from '../api';
import * as actionTypes from './actionTypes';
import { setHeaders } from './headerActions';

const setRecomendations = (recomendations) => ({
  type: actionTypes.TUTOR_GET_RECOMENDATIONS,
  payload: recomendations,
});

const getTutorRecomendationsAsync = (page, dataFormat) => async(dispatch) => {
  try {
    const res = await api.tutors.getRecomendations(page, dataFormat);
    const { headers, data } = res;

    dispatch(setHeaders(headers));
    dispatch(setRecomendations({ ...data, page }));

    return data;
  } catch (error) {
    throw new Error(error);
  }
}

const getMoreRecomendationsAsync = (page) => async(dispatch, getstate) => {

}

export default {
  getTutorRecomendationsAsync,
}
