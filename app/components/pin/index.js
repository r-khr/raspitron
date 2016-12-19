// @flow

import React, { Component, PropTypes } from 'react';
import Button from 'react-toolbox/lib/button';
import styles from './styles.css';


class Pin extends Component {
  render() {
    const { label, isOn, togglePin } = this.props;

    const buttonText = isOn ? 'TURN OFF' : 'TURN ON';
    return (
      <div className={styles.pinWrapper}>
        <p className={styles.pinStatus}>{ label }</p>
        <Button onClick={togglePin} raised primary>{ buttonText }</Button>
      </div>
    );
  }
}

Pin.propTypes = {
  label: PropTypes.string.isRequired,
  isOn: PropTypes.bool.isRequired,
  togglePin: PropTypes.func.isRequired
};

export default Pin;
