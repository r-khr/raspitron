// @flow
import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import raspi from './raspi';

const rootReducer = combineReducers({
  raspi,
  routing
});

export default rootReducer;
