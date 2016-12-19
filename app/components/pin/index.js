// @flow

import React, { Component, PropTypes } from 'react';
import Button from 'react-toolbox/lib/button';
import styles from './styles.css';


class Pin extends Component {
  render() {
    const { number, label, isOn, togglePin } = this.props;
    const buttonText = isOn ? 'TURN OFF' : 'TURN ON';

    function buttonPress() {
      const action = isOn ? 'on' : 'off';
      togglePin(number, action);
    }

    return (
      <div className={styles.pinWrapper}>
        <p className={styles.pinStatus}>{ label }</p>
        <Button onClick={buttonPress} raised primary>{ buttonText }</Button>
      </div>
    );
  }
}

Pin.propTypes = {
  number: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  isOn: PropTypes.bool.isRequired,
  togglePin: PropTypes.func.isRequired
};

export default Pin;
