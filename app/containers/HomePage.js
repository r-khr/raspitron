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
  render() {
    const { pins, deviceAddress, isLoading, setPin } = this.props;
    let headerText;
    let htmlBody;

    if (Array.isArray(pins) && pins.length > 0) {
      headerText = deviceAddress;
      htmlBody = (
        <PinList
          pins={pins}
          isLoading={isLoading}
          address={deviceAddress}
          setPin={setPin}
        />
      );
    } else {
      headerText = 'No device connected';
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
  deviceAddress: PropTypes.string.isRequired,
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
    deviceAddress: state.status.device.address
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(statusActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
