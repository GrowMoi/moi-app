import * as actionTypes from './actionTypes';
import api from '../api';
import { setHeaders } from './headerActions';

export const setLeaders = (leaders, meta, type='') => ({
  type: actionTypes.GET_LEADERBOARD,
  payload: { leaders, meta, type },
});

const handleLeadersData = (leadersResponse, leadersType, dispatch, getState) => {
   const { headers, data } = leadersResponse;
    const { leaderboard: { leaders, type } } = getState();

    const hasNewLeaders = (data.leaders || []).length;
    let pageLeaders = data.leaders;
    if (hasNewLeaders && leaders.length && type === leadersType) pageLeaders = leaders.concat(data.leaders);

    dispatch(setHeaders(headers));
    dispatch(setLeaders(pageLeaders, data.meta));
}

const getLeadersAsync = userId => async (dispatch, getState) => {
  try {
    const res = await api.leaderboard.getLeaderboard(userId);
    handleLeadersData(res, '', dispatch, getState);
  } catch (error) {
    throw new Error(error);
  }
};

const getLeadersSuperEventAsync = (userId, eventId) => async (dispatch, getState) => {
  try {
    const res = await api.leaderboard.getLeaderboardSuperEvent(userId, eventId);
    handleLeadersData(res, 'event', dispatch, getState);
  } catch (error) {
    throw new Error(error);
  }
};

export default {
  getLeadersAsync,
  getLeadersSuperEventAsync,
};
