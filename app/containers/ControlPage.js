// @flow
import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as statusActions from '../actions/status';
import PinControl from '../components/pinControl';

// ---------------------------------------------------------
// Control Page
// ---------------------------------------------------------
// This page provides programmatic control with device pins.
//
// ---------------------------------------------------------
class ControlPage extends Component {
  render() {
    const { pins } = this.props;
    const pinList = Array.isArray(pins) && pins.length > 0 ?
      this.props.pins.map((pin, index) => (
        <PinControl
          key={index}
          title={pin.name}
          isOn={pin.state === 1}
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
  fetchPins: PropTypes.func.isRequired,
  setPin: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  pins: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      number: PropTypes.number,
      state: PropTypes.state
    })
  ).isRequired
};


function mapStateToProps(state) {
  return {
    pins: state.status.pins,
    isLoading: state.status.isLoading
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(statusActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ControlPage);
