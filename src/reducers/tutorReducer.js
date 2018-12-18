import { combineReducers } from 'redux';
import * as actionTypes from '../actions/actionTypes';
import { object } from '../commons/utils';

const initialState = {
  recomendations: {
    meta: {},
    contents: [],
    page: 1,
  },
}

const recomendations = (state = initialState.recomendations, action = {}) => {
  switch (action.type) {
    case actionTypes.TUTOR_GET_RECOMENDATIONS:
      const recomendations = [
        ...((state || {}).contents || []),
        ...((action.payload || {}).contents || [])
      ];

      const cleanedRecomendations = object.removeDuplicates(recomendations, 'id');

      return {
        meta: action.payload.meta,
        contents: cleanedRecomendations,
        page: action.payload.page,
      };
    default:
      return state;
  }
}

const tutor = combineReducers({
  recomendations,
});

export default tutor;
