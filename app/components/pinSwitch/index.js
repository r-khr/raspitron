// @flow

import React, { Component, PropTypes } from 'react';
import Switch from 'react-toolbox/lib/switch';
import styles from './styles.css';

class PinSwitch extends Component {
  render() {
    const { title, isOn, togglePin } = this.props;

    return (
      <div className={styles.wrapper}>
        <Switch
          checked={isOn}
          onChange={togglePin}
          label={title}
        />
      </div>
    );
  }
}

PinSwitch.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  isOn: PropTypes.bool.isRequired,
  togglePin: PropTypes.func.isRequired
};

export default PinSwitch;
