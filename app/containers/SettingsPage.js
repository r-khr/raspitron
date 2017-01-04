// @flow
import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// import { Button } from 'react-toolbox/lib/button';
import * as hardwareActions from '../actions/hardware';
import * as statusActions from '../actions/status';
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
    const { devices, deviceId, linkDevice } = this.props;
    const deviceList = Array.isArray(devices) && devices.length > 0 ? (
      <DeviceList devices={devices} deviceId={deviceId} linkDevice={linkDevice} />
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
  linkDevice: PropTypes.func.isRequired,
  // setPin: PropTypes.func.isRequired,
  deviceId: PropTypes.string.isRequired,
  devices: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      ip: PropTypes.string
    })
  )
};


function mapStateToProps(state) {
  return {
    devices: state.hardware.devices,
    deviceId: state.status.deviceId
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ ...hardwareActions, ...statusActions }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsPage);
