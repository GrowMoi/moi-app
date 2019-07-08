import { combineReducers } from 'redux';
import { Dimensions } from 'react-native';
import * as actionTypes from '../actions/actionTypes';
import { LANDSCAPE, PORTRAIT } from '../constants';

const initialState = {
  dimensions: {
    width: null,
    height: null,
    orientation: null,
  },
  heightPercent: null,
};

const dimensions = (state = initialState.dimensions, action) => {
  const { width, height } = Dimensions.get('window');
  const orientation = width >= height ? LANDSCAPE : PORTRAIT;

  switch (action.type) {
    case actionTypes.SET_DEVICE_DIMENSIONS:
      return {
        width,
        height,
        orientation,
      };
    default:
      return state;
  }
};

const heightPercent =  (state = initialState.heightPercent, action) => {
  switch (action.type) {
    case actionTypes.SET_HEIGTH_PERCENT:
      return action.payload;
    default:
      return state;
  }
};

export default combineReducers({
  dimensions,
  heightPercent,
});
