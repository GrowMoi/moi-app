import { combineReducers } from 'redux';
import routes from './routes';
import device from './deviceReducer';
// ... other reducers

export default combineReducers({
  routes,
  device,
  // ... other reducers
});
