// @flow
import React, { Component, PropTypes } from 'react';
import Dialog from 'react-toolbox/lib/dialog';
import TimePicker from 'react-toolbox/lib/time_picker';
import Switch from 'react-toolbox/lib/switch';

class PinRuleModal extends Component {
  constructor(props) {
    super(props);

    const time = new Date();

    this.state = {
      isModalActive: false,
      setTo: false,
      time,
    };
  }

  componentWillReceiveProps(props) {
    this.setState({
      time: props.time,
      setTo: props.setTo
    });
  }

  hangleTimeChange(time) {
    this.setState({
      time
    });
  }

  hanglePinChange() {
    this.setState({
      setTo: !this.state.setTo
    });
  }

  render() {
    const { title, isActive, saveFunc, cancelFunc } = this.props;
    const actions = [
      { label: 'Cancel', onClick: cancelFunc },
      { label: 'Save', onClick: saveFunc.bind(this, this.state.time, this.state.setTo) }
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
          onChange={this.hangleTimeChange.bind(this)}
          value={this.state.time}
        />
        <Switch
          checked={this.state.setTo}
          label="Pin State"
          onChange={this.hanglePinChange.bind(this)}
        />
      </Dialog>
    );
  }
}

PinRuleModal.propTypes = {
  title: PropTypes.string.isRequired,
  time: PropTypes.date,
  setTo: PropTypes.bool.isRequired,
  isActive: PropTypes.bool.isRequired,
  saveFunc: PropTypes.func.isRequired,
  cancelFunc: PropTypes.func.isRequired,
};

export default PinRuleModal;
