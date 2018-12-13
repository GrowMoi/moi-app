import { combineReducers } from 'redux';
import * as actionTypes from '../actions/actionTypes';

const initialState = {
  userTree: {},
  audio: null,
  zoomInfo: {},
  zoomScale: 1,
};

const userTree = (state = initialState.userTree, action = {}) => {
  switch (action.type) {
    case actionTypes.LOAD_USER_TREE:
      return action.payload;
    default:
      return state;
  }
};

const audio = (state = initialState.audio, action) => {
  switch (action.type) {
    case actionTypes.SET_CURRENT_AUDIO:
      return action.payload;
    case actionTypes.REMOVE_CURRENT_AUDIO:
      return null;
    default:
      return state;
  }
}

const zoomInfo = (state = initialState.zoomInfo, action) => {
  switch (action.type) {
    case actionTypes.SET_ZOOM_TREE_INFO:
      return action.payload;
    default:
      return state;
  }
}

const zoomScale = (state = initialState.zoomScale, action) => {
  switch (action.type) {
    case actionTypes.SET_ZOOM_SCALE_TREE:
      return action.payload;
    default:
      return state;
  }
}

const tree = combineReducers({
  userTree,
  audio,
  zoomInfo,
  zoomScale,
});

export default tree;
