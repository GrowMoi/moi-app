import { createStore, applyMiddleware, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';


// other imports...
import thunk from 'redux-thunk';
import reducers from './reducers';
import { client } from './api';

// devise redux axios
import apiMiddleware from './commons/utils/apiMiddleware';

const options = { client };

// create store...
const middleware = [thunk, apiMiddleware(options)];

// eslint-disable-next-line
const store = __DEV__ ? createStore(
  reducers,
  composeWithDevTools(applyMiddleware(...middleware)),
) : createStore(
  reducers,
  compose(applyMiddleware(...middleware)),
);

export default store;
