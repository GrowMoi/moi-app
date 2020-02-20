import api from '../api';
import * as actionTypes from './actionTypes';

const cancelCurrentLearn = (testId) => async (dispatch) => {

  try {
    const res = await api.players.cancelCurrentLearn(testId);

    return res;
  } catch (error) {
    throw new Error(error)
  }
};

export default {
  cancelCurrentLearn,
};
