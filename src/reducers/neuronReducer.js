import { combineReducers } from 'redux';
import * as actionTypes from '../actions/actionTypes';

const initialState = {
  neuronSelected: {},
};

const neuronSelected = (state = initialState.neuronSelected, action = {}) => {
  switch (action.type) {
    case actionTypes.LOAD_NEURON_SELECTED:
      return action.payload;
    default:
      return state;
  }
};

export default combineReducers({
  neuronSelected,
});