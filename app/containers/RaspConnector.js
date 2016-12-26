// @flow

import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import styles from './_container.css';
import * as statusActions from '../actions/status';

class RaspConnector extends Component {
  render() {
    return (
      <div className={styles.wrapper}>
        Connector for Pi
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    pins: state.status.pins,
    isLoading: state.status.isLoading,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(statusActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(RaspConnector);
