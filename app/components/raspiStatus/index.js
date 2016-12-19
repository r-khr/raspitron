// @flow

import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Pin from '../pin';
import styles from './styles.css';
import * as raspiActions from '../../actions/raspi';


class RaspiStatus extends Component {
  componentWillMount() {
    this.props.fetchStatus();
  }

  render() {
    const { isLightOn, isFanOn, isLoading } = this.props;

    const lightStatus = isLightOn ? 'Light Currently On' : 'Light Currently Off';
    const fanStatus = isFanOn ? 'Fan Currently On' : 'Fan Currently Off';

    const label = 'Fan';
    const isOn = true;
    function togglePin() {
    }

    return (
      <div className={styles.light}>
        { isLoading ? 'Loading' : null}
        <p className={styles.lightStatus}>{ lightStatus }</p>
        <p className={styles.lightStatus}>{ fanStatus }</p>
        <Pin label={label} isOn={isOn} togglePin={togglePin} />
      </div>
    );
  }
}

RaspiStatus.propTypes = {
  fetchStatus: PropTypes.func.isRequired,
  isLightOn: PropTypes.bool.isRequired,
  isFanOn: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired
};


function mapStateToProps(state) {
  return {
    isLightOn: state.raspi.isLightOn,
    isFanOn: state.raspi.isFanOn,
    isLoading: state.raspi.isLoading,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(raspiActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(RaspiStatus);
