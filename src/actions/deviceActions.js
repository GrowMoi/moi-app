import { Dimensions } from 'react-native'
import * as actionTypes from './actionTypes';
import { PORTRAIT, LANDSCAPE } from '../constants'

export const setDeviceDimensions = (options) => {
  const { width, height } = (options || {}).base === 'window' ? Dimensions.get('window') : Dimensions.get('window');

  //FIXME: add support for landscape
  const orientation = width >= height ? LANDSCAPE : PORTRAIT;

  return {
    type: actionTypes.SET_DEVICE_DIMENSIONS,
    payload: {
      width,
      height,
      orientation: PORTRAIT,
    },
  };
}

export const setNetInfo = (netInfo) => {
  return {
    type: actionTypes.SET_CONNECTION_INFO,
    payload: netInfo,
  };
}

export const setHeightPercent = (percennt) => ({ type: actionTypes.SET_HEIGTH_PERCENT, payload: percennt });