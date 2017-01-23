// @flow
import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import device from './device';
import rules from './rules';
import hardware from './hardware';

const rootReducer = combineReducers({
  device,
  rules,
  hardware,
  routing
});

export default rootReducer;
