import { Dimensions, Alert } from 'react-native'
import * as actionTypes from './actionTypes';
import { PORTRAIT, LANDSCAPE } from '../constants'
import store from '../store'

export const hiddenNetworkAlert = () => ({
  type: actionTypes.HIDDEN_NETWORK_ALERT,
})
export const showNetworkAlert = () => ({
  type: actionTypes.SHOW_NETWORK_ALERT,
})

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

export const networkAlert = (visible) => (dispatch, getState) => {
  if(!getState().device.networkAlert && visible) {
    dispatch(showNetworkAlert());
    setTimeout(() => {
      Alert.alert(
        'Error de Red',
        'Ha tardado demasiado en encontrar lo que buscabas, revisa tu conexión a internet por favor.',
        [
          {text: 'Ok', onPress:() => {
            dispatch(hiddenNetworkAlert())
          }}
        ]
      )
    }, 1000)
  }
}

export const setHeightPercent = (percennt) => ({ type: actionTypes.SET_HEIGTH_PERCENT, payload: percennt });