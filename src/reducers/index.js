import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import routes from './routes';
import device from './deviceReducer';
import neuron from './neuronReducer';
import tree from './treeReducer';
import user from './userReducer';
import leaderboard from './leaderboardReducer';
import search from './searchReducer';
import tutor from './tutorReducer';
import sideMenu from './sideReducer';
import usersChat from './chatReducer';
// ... other reducers
import * as actionTypes from '../actions/actionTypes';
import { object } from '../commons/utils';

const appReducer = combineReducers({
  routes,
  device,
  neuron,
  tree,
  user,
  form,
  leaderboard,
  search,
  tutor,
  sideMenu,
  usersChat,
  // ... other reducers
});

const rootReducer = (state, action) => {
  if (action.type === actionTypes.RESET_DATA) {
    const config = object.buildObjectWithSpecificKeys(state, [
      'device.dimensions',
      'device.netInfo'
    ]);

    state = config
  }

  return appReducer(state, action)
}

export default rootReducer;
