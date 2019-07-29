import * as actionTypes from './actionTypes';
import api from '../api';
import { setHeaders } from './headerActions';

export const setLeaders = (leaderboardData) => ({
  type: actionTypes.GET_LEADERBOARD,
  payload: leaderboardData,
});

const getLeadersAsync = (userId, page = 1) => async (dispatch) => {
  try {
    const res = await api.leaderboard.getLeaderboard(userId, page);

    await dispatch(setHeaders(res.headers));
    dispatch(setLeaders({ ...res.data, page }));
  } catch (error) {
    throw new Error(error);
  }
};

const loadMoreLeadersAsync = (userId) => async (dispatch, getState) => {

  const leadersState = getState().leaderboard.leaders;
  const currentPage = (leadersState || {}).page;
  const nextPage = currentPage + 1;
  const totalPages = (leadersState.meta || {}).total_pages || 1;

  if(nextPage <= totalPages) {
    const res = await dispatch(getLeadersAsync(userId, nextPage));
    dispatch(setHeaders(res.headers));
  }
}

const getLeadersSuperEventAsync = (userId, eventId) => async (dispatch, getState) => {
  try {
    const res = await api.leaderboard.getLeaderboardSuperEvent(userId, eventId);

    await dispatch(setHeaders(res.headers));
    dispatch(setLeaders({ ...res.data }));
    return res.data;
  } catch (error) {
    throw new Error(error);
  }
};

export default {
  getLeadersAsync,
  loadMoreLeadersAsync,
  getLeadersSuperEventAsync,
};
