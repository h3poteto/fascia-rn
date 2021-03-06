import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import {createLogger} from 'redux-logger';

import reducers from './reducers/index';

const logger = createLogger();
const middlewares = [thunk, logger];

const store = createStore(
  reducers(),
  {},
  compose(applyMiddleware(...middlewares)),
);

export default store;
