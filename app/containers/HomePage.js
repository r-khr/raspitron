// @flow
import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button } from 'react-toolbox/lib/button';
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
    let headerText = 'List of Pins';
    let htmlBody;

    if (device && Array.isArray(pins) && pins.length > 0) {
      headerText += ' - ' + device.address;
      htmlBody = (
        <PinList
          pins={pins}
          isLoading={isLoading}
          address={device.address}
          setPin={setPin}
        />
      );
    } else {
      htmlBody = (
        <div className={'row'}>
          <p className={'col col-sm-12'}>No device currently linked with Raspitron. Please go to &#39;Device Settings&#39; to manage devices.</p>
          <div className={'col col-sm-12'}>
            <Button
              icon='link'
              label='Link Device'
              href='#/settings'
              raised primary
            />
          </div>
        </div>
      );
    }

    return (
      <div>
        <div className={'page-header'}>
          <h3>
            {headerText}
          </h3>
        </div>
        {htmlBody}
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
