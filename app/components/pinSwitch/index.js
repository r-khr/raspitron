// @flow

import React, { Component, PropTypes } from 'react';
import Switch from 'react-toolbox/lib/switch';

class PinSwitch extends Component {
  render() {
    const { header, name, isOn, togglePin } = this.props;
    return (
      <div className={'panel panel-default'}>
        <div className={'panel-heading'}>
          { header }
        </div>
        <div className={'panel-body'}>
          <Switch
            checked={isOn}
            onChange={togglePin}
            label={name}
          />
        </div>
      </div>
    );
  }
}

PinSwitch.propTypes = {
  header: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  isOn: PropTypes.bool.isRequired,
  togglePin: PropTypes.func.isRequired
};

export default PinSwitch;
