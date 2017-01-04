// @flow
import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// import { Button } from 'react-toolbox/lib/button';
import * as hardwareActions from '../actions/hardware';
import DeviceList from '../components/deviceList';

// ------------------------------------------------------
// Settings Page
// ------------------------------------------------------
// This page provides configuration for api.
//
// ------------------------------------------------------

class SettingsPage extends Component {
  componentWillMount() {
    this.props.scanAllDevices(this.props.devices);
  }
  render() {
    const { devices } = this.props;
    const deviceList = Array.isArray(devices) && devices.length > 0 ? (
      <DeviceList devices={devices} />
    ) : (
      <p>No devices</p>
    );

    return (
      <div>
        <div className={'page-header'}>
          <h3>
            Devices Settings
          </h3>
        </div>
        { deviceList }
      </div>
    );
  }
}

// ------------------------------------------------------------------------
// todo: Add button
// <Button className={'pull-right'} icon='add' floating mini accent />
// ------------------------------------------------------------------------

SettingsPage.propTypes = {
  scanAllDevices: PropTypes.func.isRequired,
  // setPin: PropTypes.func.isRequired,
  devices: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      ip: PropTypes.string
    })
  )
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
