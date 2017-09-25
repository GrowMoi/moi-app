import { createStore, applyMiddleware, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

// other imports...
import thunk from 'redux-thunk';
import reducers from './reducers';

// create store...
const middleware = [thunk];

// eslint-disable-next-line
const store = __DEV__ ? createStore(
  reducers,
  composeWithDevTools(applyMiddleware(...middleware)),
) : createStore(
  reducers,
  compose(applyMiddleware(...middleware)),
);

export default store;
