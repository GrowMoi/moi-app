import { combineReducers } from 'redux';
import * as actionTypes from '../actions/actionTypes';

const initialState = {
  neuronSelected: {},
  contentSelected: {},
  recomendedContents: {},
  currentlyPressed: {
    pageX: null,
    pageY: null,
  },
};

const neuronSelected = (state = initialState.neuronSelected, action = {}) => {
  switch (action.type) {
    case actionTypes.LOAD_NEURON_SELECTED:
      return action.payload;
    default:
      return state;
  }
};

const contentSelected = (state = initialState.contentSelected, action = {}) => {
  switch (action.type) {
    case actionTypes.LOAD_CONTENT_SELECTED:
      return action.payload;
    default:
      return state;
  }
};

const recomendedContents = (state = initialState.recomendedContents, action = {}) => {
  switch (action.type) {
    case actionTypes.LOAD_RECOMENDED_CONTENTS:
      return action.payload;
    default:
      return state;
  }
};

const currentlyPressed = (state = initialState.currentlyPressed, action = {}) => {
  switch (action.type) {
    case actionTypes.SET_NEURON_INFO:
      return action.payload;
    default:
      return state;
  }
}

export default combineReducers({
  neuronSelected,
  contentSelected,
  recomendedContents,
  currentlyPressed,
});
