// @flow

import React, { Component, PropTypes } from 'react';
import Switch from 'react-toolbox/lib/switch';
// import styles from './styles.css';


class Pin extends Component {
  render() {
    const { label, isOn, togglePin } = this.props;

    return (
      <Switch
        checked={isOn}
        onChange={togglePin}
        label={label}
      />
    );
  }
}

Pin.propTypes = {
  label: PropTypes.string.isRequired,
  isOn: PropTypes.bool.isRequired,
  togglePin: PropTypes.func.isRequired
};

export default Pin;
