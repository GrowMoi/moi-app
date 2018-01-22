import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import routes from './routes';
import device from './deviceReducer';
import neuron from './neuronReducer';
import tree from './treeReducer';
import user from './userReducer';
import leaderboard from './leaderboardReducer';
import search from './searchReducer';
// ... other reducers

export default combineReducers({
  routes,
  device,
  neuron,
  tree,
  user,
  form,
  leaderboard,
  search,
  // ... other reducers
});
