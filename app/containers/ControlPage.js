// @flow
import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as deviceActions from '../actions/device';
import PinControl from '../components/pinControl';

// ---------------------------------------------------------
// Control Page
// ---------------------------------------------------------
// This page provides programmatic control with device pins.
//
// ---------------------------------------------------------
class ControlPage extends Component {
  render() {
    const { pins, addPinRule } = this.props;
    const pinList = Array.isArray(pins) && pins.length > 0 ?
      this.props.pins.map((pin, index) => (
        <PinControl
          key={index}
          title={pin.name}
          number={pin.number}
          rules={pin.rules}
          addPinRule={addPinRule}
        />
      )) : (
        <div className={'row'}>
          <p className={'col col-sm-12'}>Pins have not loaded.</p>
        </div>
      );

    return (
      <div>
        <div className={'page-header'}>
          <h3>
            Programmatic Pin Control
          </h3>
        </div>
        { pinList }
      </div>
    );
  }
}

ControlPage.propTypes = {
  addPinRule: PropTypes.func.isRequired,
  setPin: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  pins: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      number: PropTypes.number,
      state: PropTypes.state,
      rules: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string,
          time: PropTypes.date,
          setTo: PropTypes.bool
        })
      )
    })
  ).isRequired
};


function mapStateToProps(state) {
  return {
    pins: state.device.pins,
    isLoading: state.device.isLoading
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(deviceActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ControlPage);
