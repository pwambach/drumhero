import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {createLogger} from 'redux-logger';
import * as reducers from './root';
import {SET_CURRENT_TIME} from './current-time';

const rootReducer = combineReducers(reducers);
const loggerMiddleware = createLogger({
  collapsed: true,
  predicate: (getState, action) => action.type !== SET_CURRENT_TIME
});

export function create() {
  return createStore(
    rootReducer,
    applyMiddleware(thunkMiddleware, loggerMiddleware)
  );
}
