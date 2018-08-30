import { combineReducers } from 'redux';
import * as actionTypes from '../actions/actionTypes';

const initialState = {
  recomendations: {},
}

const recomendations = (state = initialState.recomendations, action = {}) => {
  switch (action.type) {
    case actionTypes.TUTOR_GET_RECOMENDATIONS:
      return action.payload
    default:
      return state;
  }
}

const tutor = combineReducers({
  recomendations,
});

export default tutor;
