// @flow
import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';
import HomePage from './containers/HomePage';
import SettingsPage from './containers/SettingsPage';
import ControlPage from './containers/ControlPage';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route path="/control" component={ControlPage} />
    <Route path="/settings" component={SettingsPage} />
  </Route>
);
