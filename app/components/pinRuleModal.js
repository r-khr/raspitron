// @flow
import React, { Component, PropTypes } from 'react';
import Dialog from 'react-toolbox/lib/dialog';
import TimePicker from 'react-toolbox/lib/time_picker';
import Switch from 'react-toolbox/lib/switch';

function PinRuleModal({
  rule,
  saveFunc,
  cancelFunc
}) {
  if(rule === null) {
    return null;
  }

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
      title='Edit'
    >
      <TimePicker
        format='ampm'
        label='Action Time'
        onChange={(value) => console.log(value)}
        value={rule.time}
      />
      <Switch
        checked={rule.set_to}
        label='Pin State'
        onChange={(value) => console.log(value)}
      />
    </Dialog>
  );
}

PinRuleModal.propTypes = {
  rule: PropTypes.any.isRequired,
  saveFunc: PropTypes.func.isRequired,
  cancelFunc: PropTypes.func.isRequired,
};

export default PinRuleModal;
