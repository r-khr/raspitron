// @flow
import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PinSwitch from '../components/pinSwitch';
import * as statusActions from '../actions/status';

// ------------------------------------------------------
// Home Page
// ------------------------------------------------------
// This page provides interaction with device pins.
//
// ------------------------------------------------------

class HomePage extends Component {
  componentWillMount() {
    this.props.fetchPins();
  }

  render() {
    if (Array.isArray(this.props.pins) && !this.props.isLoading) {
      const pins = this.props.pins.map((pin) => {
        const index = this.props.pins.indexOf(pin);
        const header = 'Pin #' + pin.number;

        function updatePin(number, pinState) {
          const action = pinState === 0 ? 'on' : 'off';
          this.props.setPin(number, action);
        }

        return (
          <div key={index} className={'col col-sm-4'}>
            <PinSwitch
              header={header}
              name={pin.name}
              isOn={pin.state === 1}
              togglePin={updatePin.bind(this, pin.number, pin.state)}
            />
          </div>
        );
      }
      );
      return (
        <div>
          <div className={'page-header'}>
            <h3>
              List of Pins
            </h3>
          </div>
          <div className={'row'}>
            { pins }
          </div>
        </div>
      );
    }
    // If loading
    return (
      <div className={'row'}>
        <p>Loading Raspberry Pi GPIO Pin Status</p>
      </div>
    );
  }
}

HomePage.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
