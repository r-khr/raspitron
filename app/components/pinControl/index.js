// @flow

import React, { Component, PropTypes } from 'react';
import styles from './styles.css';

class PinControl extends Component {
  render() {
    const { title, isOn } = this.props;
    const isOnString = isOn ? 'On' : 'Off';

    return (
      <div className={styles.wrapper}>
        <div>{title}</div>
        <div>Currently {isOnString}</div>
      </div>
    );
  }
}

PinControl.propTypes = {
  title: PropTypes.string.isRequired,
  isOn: PropTypes.bool.isRequired
};

export default PinControl;
