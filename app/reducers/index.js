// @flow
import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import status from './status';
import hardware from './hardware';

const rootReducer = combineReducers({
  status,
  hardware,
  routing
});

export default rootReducer;
