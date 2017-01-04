// @flow
import React, { Component, PropTypes } from 'react';
import PinSwitch from './pinSwitch';

class PinList extends Component {
  render() {
    const { setPin, isLoading, pins } = this.props;
    const htmlPins = pins.map((pin, index) => {
      function updatePin(number, pinState) {
        const action = pinState === 0 ? 'on' : 'off';
        setPin(number, action);
      }

      return (
        <div key={index} className={'col col-sm-4'}>
          <PinSwitch
            header={'Pin #' + pin.number}
            name={pin.name}
            isLoading={isLoading}
            isOn={pin.state === 1}
            togglePin={updatePin.bind(this, pin.number, pin.state)}
          />
        </div>
      );
    });
    return (
      <div className={'row'}>
        { htmlPins }
      </div>
    );
  }
}

PinList.propTypes = {
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

export default PinList;
