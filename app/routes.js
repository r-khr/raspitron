// @flow
import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './pages/App';
import HomePage from './pages/HomePage';
import SettingsPage from './pages/SettingsPage';
import ControlPage from './pages/ControlPage';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route path="/control" component={ControlPage} />
    <Route path="/settings" component={SettingsPage} />
  </Route>
);
