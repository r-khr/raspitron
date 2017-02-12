// @flow
import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button } from 'react-toolbox/lib/button';
import PinList from '../components/pinList';
import * as pinActions from '../actions/pins';

// ------------------------------------------------------
// Home Page
// ------------------------------------------------------
// This page provides interaction with device pins.
//
// ------------------------------------------------------

class HomePage extends Component {
  render() {
    const { pins, deviceAddress, isLoading, postPins } = this.props;
    const headerText = pins.length > 0 ? deviceAddress : 'No device connected';
    function updatePins(pins) {
      postPins(deviceAddress, pins);
    }

    const htmlBody = pins.length > 0 ? (
      <PinList
        pins={pins}
        isLoading={isLoading}
        updatePins={updatePins}
      />
    ) : (
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
  postPins: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  deviceAddress: PropTypes.string.isRequired,
  pins: PropTypes.array.isRequired
};


function mapStateToProps(state) {
  return {
    pins: state.pins,
    isLoading: state.device.isLoading,
    deviceAddress: state.device.address
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(pinActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
