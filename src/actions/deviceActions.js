import { Dimensions } from 'react-native'
import * as actionTypes from './actionTypes';
import { PORTRAIT, LANDSCAPE } from '../constants'

export const setDeviceDimensions = (options) => {
  const { width, height } = (options || {}).base === 'window' ? Dimensions.get('window') : Dimensions.get('screen');
  const orientation = width >= height ? LANDSCAPE : PORTRAIT;

  return {
    type: actionTypes.SET_DEVICE_DIMENSIONS,
    payload: {
      width,
      height,
      orientation,
    },
  };
}

export const setHeightPercent = (percennt) => ({ type: actionTypes.SET_HEIGTH_PERCENT, payload: percennt });