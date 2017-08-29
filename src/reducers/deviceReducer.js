import { combineReducers } from 'redux';
import { Dimensions } from 'react-native';
import { SET_DEVICE_DIMENSIONS } from '../actions/deviceActions';
import { LANDSCAPE, PORTRAIT } from '../constants';

const initialState = {
  dimensions: {
    width: null,
    height: null,
    orientation: null,
  },
};

const dimensions = (state = initialState.dimensions, action) => {
  const { width, height } = Dimensions.get('window');
  const orientation = width >= height ? LANDSCAPE : PORTRAIT;

  switch (action.type) {
    case SET_DEVICE_DIMENSIONS:
      return {
        ...state,
        width,
        height,
        orientation,
      };
    default:
      return state;
  }
};

export default combineReducers({
  dimensions,
});
