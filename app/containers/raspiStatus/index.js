// @flow

import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Pin from '../../components/pin';
import styles from './styles.css';
import * as statusActions from '../../actions/status';


class RaspiStatus extends Component {
  componentWillMount() {
    this.props.fetchStatus();
  }

  render() {
    if (Array.isArray(this.props.pins) && !this.props.isLoading) {
      const pins = this.props.pins.map((pin) => {
        const index = this.props.pins.indexOf(pin);
        const isOn = pin.state === 0;

        function updatePin(number, action) {
          this.props.setPin(number, action);
        }

        return (
          <Pin
            key={index}
            number={pin.number}
            label={pin.name}
            isOn={isOn}
            togglePin={updatePin.bind(this)}
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

RaspiStatus.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(RaspiStatus);
