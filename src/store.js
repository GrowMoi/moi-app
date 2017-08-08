import { createStore, applyMiddleware, compose } from 'redux';

// other imports...
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import reducers from './reducers';

// create store...
const middleware = [thunk, logger];
const store = compose(
  applyMiddleware(...middleware),
)(createStore)(reducers);

export default store;
