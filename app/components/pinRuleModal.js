// @flow
import React, { Component, PropTypes } from 'react';
import Dialog from 'react-toolbox/lib/dialog';
import TimePicker from 'react-toolbox/lib/time_picker';
import Switch from 'react-toolbox/lib/switch';

class PinRuleModal extends Component {
  render() {
    const { title, isActive, time, setTo, saveFunc, cancelFunc } = this.props;
    const actions = [
      { label: 'Cancel', onClick: cancelFunc },
      { label: 'Save', onClick: saveFunc }
    ];

    return (
      <Dialog
        actions={actions}
        active={isActive}
        onEscKeyDown={cancelFunc}
        onOverlayClick={cancelFunc}
        title={title}
      >
        <TimePicker
          format='ampm'
          label='Action Time'
          onChange={(value) => console.log(value)}
          value={time}
        />
        <Switch
          checked={setTo}
          label='Pin State'
          onChange={(value) => console.log(value)}
        />
      </Dialog>
    );
  }
}

PinRuleModal.propTypes = {
  title: PropTypes.string,
  time: PropTypes.instanceOf(Date),
  setTo: PropTypes.bool,
  isActive: PropTypes.bool.isRequired,
  saveFunc: PropTypes.func.isRequired,
  cancelFunc: PropTypes.func.isRequired,
};

export default PinRuleModal;
