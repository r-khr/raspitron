// @flow
import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import device from './device';
import hardware from './hardware';

const rootReducer = combineReducers({
  device,
  hardware,
  routing
});

export default rootReducer;
