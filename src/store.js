import { createStore, applyMiddleware, compose } from 'redux';

// other imports...
import thunk from 'redux-thunk';
import reducers from './reducers';
import client from './axios-client';

// devise redux axios
import apiMiddleware from './commons/utils/apiMiddleware';
import routeMiddleware from './commons/utils/routeMiddleware';

const options = { client };

// create store...
const middleware = [thunk, apiMiddleware(options), routeMiddleware()];

// eslint-disable-next-line
const store = createStore(
  reducers,
  compose(applyMiddleware(...middleware)),
);

export default store;
