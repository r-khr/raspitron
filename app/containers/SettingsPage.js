// @flow
import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button } from 'react-toolbox/lib/button';
import * as hardwareActions from '../actions/hardware';
import Device from '../components/device';

// ------------------------------------------------------
// Settings Page
// ------------------------------------------------------
// This page provides configuration for api.
//
// ------------------------------------------------------

class SettingsPage extends Component {
  componentWillMount() {
    // this.props.fetchStatus();
  }
  render() {
    return (
      <div>
        <div className={'page-header'}>
          <h2>
            List of Devices
            <Button className={'pull-right'} icon='add' label='Add Device' raised primary />
          </h2>
        </div>
        <div className={'row'}>
          <Device />
        </div>
      </div>
    );
  }
}

SettingsPage.propTypes = {
  fetchStatus: PropTypes.func.isRequired,
  setPin: PropTypes.func.isRequired
};


function mapStateToProps(state) {
  return {
    devices: state.hardware.devices
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(hardwareActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsPage);
