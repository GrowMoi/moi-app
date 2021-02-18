import { combineReducers } from 'redux';
import * as actionTypes from '../actions/actionTypes';
import { Dimensions } from 'react-native'

const initialState = {
  dimensions: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    orientation: null,
  },
  heightPercent: null,
  netInfo: {},
};

const dimensions = (state = initialState.dimensions, action) => {
  switch (action.type) {
    case actionTypes.SET_DEVICE_DIMENSIONS:
      return {...state, ...(action.payload || {})};
    case actionTypes.RESET_DATA:
      return {...state, ...(action.payload || {})};
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

const netInfo =  (state = initialState.netInfo, action) => {
  switch (action.type) {
    case actionTypes.SET_CONNECTION_INFO:
      return action.payload;
    default:
      return state;
  }
};

export default combineReducers({
  dimensions,
  heightPercent,
  netInfo,
});