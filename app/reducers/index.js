// @flow
import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import device from './device';
import pins from './pins';
import rules from './rules';
import hardware from './hardware';

const rootReducer = combineReducers({
  device,
  pins,
  rules,
  hardware,
  routing
});

export default rootReducer;
