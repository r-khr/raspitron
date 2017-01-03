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
  componentWillMount() {
    this.props.fetchPins();
  }
  render() {
    if (Array.isArray(this.props.pins) && !this.props.isLoading) {
      const pins = this.props.pins.map((pin) => {
        const index = this.props.pins.indexOf(pin);

        return (
          <PinControl
            key={index}
            title={pin.name}
            isOn={pin.state === 1}
          />
        );
      }
      );
      return (
        <div>
          { pins }
        </div>
      );
    }
    // If loading
    return (
      <div>
        <p>Loading Raspberry Pi GPIO Pin Status</p>
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
  ).isRequired,
};


function mapStateToProps(state) {
  return {
    pins: state.status.pins,
    isLoading: state.status.isLoading,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(statusActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ControlPage);
