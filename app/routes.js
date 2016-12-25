// @flow
import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './pages/App';
import HomePage from './pages/HomePage';
import TimerPage from './pages/TimerPage';


export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route path="/timer" component={TimerPage} />
  </Route>
);
