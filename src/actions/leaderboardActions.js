import * as actionTypes from './actionTypes';
import api from '../api';
import { setHeaders } from './headerActions';

export const setLeaders = (leaderboardData) => ({
  type: actionTypes.GET_LEADERBOARD,
  payload: leaderboardData,
});

const getLeadersAsync = (params, page = 1) => async (dispatch) => {
  try {
    const res = await api.leaderboard.getLeaderboard(params, page);

    await dispatch(setHeaders(res.headers));
    dispatch(setLeaders({ ...res.data, page }));
  } catch (error) {
    throw new Error(error);
  }
};

const loadMoreLeadersAsync = (params) => async (dispatch, getState) => {

  const leadersState = getState().leaderboard.leaders;
  const currentPage = (leadersState || {}).page;
  const nextPage = currentPage + 1;
  const totalPages = (leadersState.meta || {}).total_pages || 1;

  if(nextPage <= totalPages) {
    await dispatch(getLeadersAsync(params, nextPage));
  }
}

export default {
  getLeadersAsync,
  loadMoreLeadersAsync,
};
