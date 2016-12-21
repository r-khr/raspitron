// @flow
import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import status from './status';

const rootReducer = combineReducers({
  status,
  routing
});

export default rootReducer;
