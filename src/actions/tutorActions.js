import api from '../api';
import * as actionTypes from './actionTypes';
import { setHeaders } from './headerActions';

const setRecomendations = (recomendations) => ({
  type: actionTypes.TUTOR_GET_RECOMENDATIONS,
  payload: recomendations,
});

const setDetails = (details) => ({
  type: actionTypes.TUTOR_GET_DETAILS,
  payload: details,
});

const getTutorRecomendationsAsync = (page = 1, dataFormat) => async(dispatch) => {
  try {
    const res = await api.tutors.getRecomendations(page, dataFormat);
    const { headers, data } = res;

    dispatch(setHeaders(headers));
    dispatch(setRecomendations({ ...data, page }));

    return res;
  } catch (error) {
    throw new Error(error);
  }
}

const getTutorDetailsAsync = () => async(dispatch) => {
  try {
    const res = await api.tutors.getDetails();
    const { headers, data } = res;

    dispatch(setHeaders(headers));
    dispatch(setDetails(data.details));

    return data.details;
  } catch (error) {
    throw new Error(error);
  }
}

const getMoreRecomendationsAsync = () => async(dispatch, getState) => {
  const recomendationsState = getState().tutor.recomendations;

  const currentPage = (recomendationsState || {}).page;
  const pageToGet = currentPage + 1;
  const maxPage = (recomendationsState.meta || {}).total_pages || 1;

  if(pageToGet <= maxPage) {
    const res = await dispatch(getTutorRecomendationsAsync(pageToGet));
    dispatch(setHeaders(res.headers));
  }
}

export default {
  getTutorRecomendationsAsync,
  getMoreRecomendationsAsync,
  getTutorDetailsAsync,
}
