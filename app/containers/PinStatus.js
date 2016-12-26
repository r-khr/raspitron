// @flow

import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PinSwitch from '../components/pinSwitch';
import styles from './_container.css';
import * as statusActions from '../actions/status';


class PinStatus extends Component {
  componentWillMount() {
    this.props.fetchStatus();
  }

  render() {
    if (Array.isArray(this.props.pins) && !this.props.isLoading) {
      const pins = this.props.pins.map((pin) => {
        const index = this.props.pins.indexOf(pin);
        const isOn = pin.state === 0;
        const subtitle = 'Pin #' + pin.number;

        function updatePin(number, _isOn) {
          const action = _isOn ? 'on' : 'off';
          this.props.setPin(number, action);
        }

        return (
          <PinSwitch
            className={styles.element}
            key={index}
            title={pin.name}
            subtitle={subtitle}
            isOn={isOn}
            togglePin={updatePin.bind(this, pin.number, isOn)}
          />
        );
      }
      );
      return (
        <div className={styles.wrapper}>
          { pins }
        </div>
      );
    }
    // If loading
    return (
      <div className={styles.wrapper}>
        <p>Loading Raspberry Pi GPIO Pin Status</p>
      </div>
    );
  }
}

PinStatus.propTypes = {
  fetchStatus: PropTypes.func.isRequired,
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

export default connect(mapStateToProps, mapDispatchToProps)(PinStatus);
