// @flow
import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PinList from '../components/pinList';
import * as statusActions from '../actions/status';

// ------------------------------------------------------
// Home Page
// ------------------------------------------------------
// This page provides interaction with device pins.
//
// ------------------------------------------------------

class HomePage extends Component {
  componentWillMount() {
    const device = this.props.devices.find(d => d.id === this.props.deviceId);
    if (device) {
      this.props.fetchPins(device.address);
    }
  }

  render() {
    const { pins, isLoading, setPin, devices, deviceId } = this.props;
    const device = devices.find(d => d.id === deviceId);
    const pinList = Array.isArray(pins) && pins.length > 0 ? (
      <PinList
        pins={pins}
        isLoading={isLoading}
        address={device.address}
        setPin={setPin}
      />
    ) : (
      <div className={'row'}>
        <p className={'col col-sm-12'}>Pins have not loaded.</p>
      </div>
    );

    return (
      <div>
        <div className={'page-header'}>
          <h3>
            List of Pins {device ? device.address : ''}
          </h3>
        </div>
        { pinList }
      </div>
    );
  }
}

HomePage.propTypes = {
  fetchPins: PropTypes.func.isRequired,
  setPin: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  devices: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      ip: PropTypes.string
    })
  ),
  deviceId: PropTypes.string.isRequired,
  pins: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      number: PropTypes.number,
      state: PropTypes.state
    })
  ).isRequired,
};


function mapStateToProps(state) {
  return {
    pins: state.status.pins,
    isLoading: state.status.isLoading,
    deviceId: state.status.deviceId,
    devices: state.hardware.devices,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(statusActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
