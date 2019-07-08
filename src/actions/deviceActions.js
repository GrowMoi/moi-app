import * as actionTypes from './actionTypes';

export const setDeviceDimensions = () => ({ type: actionTypes.SET_DEVICE_DIMENSIONS });

export const setHeightPercent = (percennt) => ({ type: actionTypes.SET_HEIGTH_PERCENT, payload: percennt });