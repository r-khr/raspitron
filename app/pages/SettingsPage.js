// @flow
import React, { Component } from 'react';
// import styles from './_pages.css';
import RaspConnector from '../containers/RaspConnector';

// ------------------------------------------------------
// Settings Page
//
// This page provides configuration for api
//
// ------------------------------------------------------

export default class SettingsPage extends Component {
  render() {
    return (
      <div>
        <RaspConnector />
      </div>
    );
  }
}
