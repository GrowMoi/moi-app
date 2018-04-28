import { createStore, applyMiddleware, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

// other imports...
import thunk from 'redux-thunk';
import reducers from './reducers';
import { client } from './api';

// devise redux axios
import apiMiddleware from './commons/utils/apiMiddleware';
import routeMiddleware from './commons/utils/routeMiddleware';

const options = { client };

// create store...
const middleware = [thunk, apiMiddleware(options), routeMiddleware()];

// eslint-disable-next-line
const store = __DEV__ ? createStore(
  reducers,
  composeWithDevTools(applyMiddleware(...middleware)),
) : createStore(
  reducers,
  compose(applyMiddleware(...middleware)),
);

export default store;
