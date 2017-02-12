// @flow
import React, { PropTypes } from 'react';
import PinSwitch from './pinSwitch';

function PinList({
  updatePins,
  isLoading,
  pins
}) {
  const htmlPins = pins.map((pin, index) => {
    return (
      <div key={index} className={'col col-sm-4'}>
        <PinSwitch
          header={'Pin #' + pin.pin_number}
          name={pin.name}
          isLoading={isLoading}
          isOn={pin.state}
          togglePin={updatePin.bind(this, pin.pin_number, pin.state)}
        />
      </div>
    );
  });

  return (
    <div className={'row'}>
      { htmlPins }
    </div>
  );

  function updatePin(number, pinState) {
    const newPins = pins.map(pin => {
      if(pin.pin_number === number){
        pin.state = !pinState;
      }
      return pin;
    });

    updatePins(newPins);
  }
}

PinList.propTypes = {
  updatePins: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  pins: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      pin_number: PropTypes.number,
      state: PropTypes.state
    })
  ).isRequired,
};

export default PinList;
