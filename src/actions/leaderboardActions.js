import * as actionTypes from './actionTypes';
import api from '../api';
import { setHeaders } from './headerActions';

export const setLeaders = (leaders, meta) => ({
  type: actionTypes.GET_LEADERBOARD,
  payload: { leaders, meta },
});

const getLeadersAsync = userId => async (dispatch, getState) => {
  try {
    const res = await api.leaderboard.getLeaderboard(userId);
    const { headers, data } = res;
    const { leaderboard: { leaders } } = getState();

    const hasNewLeaders = (data.leaders || []).length;
    let pageLeaders = data.leaders;
    if (hasNewLeaders && leaders.length) pageLeaders = leaders.concat(data.leaders);

    dispatch(setHeaders(headers));
    dispatch(setLeaders(pageLeaders, data.meta));
  } catch (error) {
    // console.log(error);
    throw new Error(error);
  }
};

export default {
  getLeadersAsync,
};
