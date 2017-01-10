// @flow
import React, { Component, PropTypes } from 'react';
import Guid from 'guid';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button } from 'react-toolbox/lib/button';
import * as hardwareActions from '../actions/hardware';
import * as statusActions from '../actions/status';
import DeviceList from '../components/deviceList';
import DeviceModal from '../components/deviceModal';

// ------------------------------------------------------
// Settings Page
// ------------------------------------------------------
// This page provides configuration for api.
//
// ------------------------------------------------------

class SettingsPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalActive: false
    };

    this.props.scanAllDevices(this.props.devices);
  }

  openModalFunc() {
    this.setState({
      isModalActive: true
    });
  }

  cancelModalFunc() {
    this.setState({
      isModalActive: false
    });
  }

  addDeviceFunc(name, address) {
    this.setState({
      isModalActive: false
    });
    this.props.addDevice({
      id: Guid.raw(),
      name,
      address
    });
  }

  render() {
    const { devices, linkedDeviceId, connectToDevice, deleteDevice, updateDevice } = this.props;
    const deviceList = Array.isArray(devices) && devices.length > 0 ? (
      <DeviceList
        devices={devices}
        linkedDeviceId={linkedDeviceId}
        connectToDevice={connectToDevice}
        deleteDevice={deleteDevice}
        updateDevice={updateDevice}
      />
    ) : (
      <p>No devices</p>
    );

    return (
      <div>
        <div className={'page-header'}>
          <h3>
            Devices Settings
            <Button className={'pull-right'} icon='add' onClick={this.openModalFunc.bind(this)} floating mini accent />
          </h3>
        </div>
        <DeviceModal
          title={'Add New'}
          deviceId={''}
          deviceName={''}
          deviceAddress={''}
          isActive={this.state.isModalActive}
          saveFunc={this.addDeviceFunc.bind(this)}
          cancelFunc={this.cancelModalFunc.bind(this)}
        />
        { deviceList }
      </div>
    );
  }
}

SettingsPage.propTypes = {
  scanAllDevices: PropTypes.func.isRequired,
  connectToDevice: PropTypes.func.isRequired,
  deleteDevice: PropTypes.func.isRequired,
  addDevice: PropTypes.func.isRequired,
  updateDevice: PropTypes.func.isRequired,
  linkedDeviceId: PropTypes.string.isRequired,
  devices: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      address: PropTypes.string,
      isLoading: PropTypes.bool,
      isAvailable: PropTypes.bool
    })
  )
};


function mapStateToProps(state) {
  return {
    devices: state.hardware.devices,
    linkedDeviceId: state.status.device.id
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ ...hardwareActions, ...statusActions }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsPage);
