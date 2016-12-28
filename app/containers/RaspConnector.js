// @flow

import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button } from 'react-toolbox/lib/button';
import * as statusActions from '../actions/status';

class RaspConnector extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-sm-6">
            Connector for Pi
        </div>
        <div className="col-sm-6">
          <Button icon='add' label='Add Hardware' raised />
        </div>
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
