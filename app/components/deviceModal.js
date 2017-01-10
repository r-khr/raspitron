// @flow

import React, { Component, PropTypes } from 'react';
import Dialog from 'react-toolbox/lib/dialog';
import Input from 'react-toolbox/lib/input';


class DeviceModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalActive: false,
      deviceName: '',
      deviceAddress: ''
    };
  }

  componentWillReceiveProps(props) {
    this.setState({
      deviceName: props.deviceName,
      deviceAddress: props.deviceAddress
    });
  }

  handleChange(name, value) {
    this.setState({
      [name]: value
    });
    console.log(this.state);
  }

  render() {
    const { title, deviceId, isActive, saveFunc, cancelFunc } = this.props;
    const actions = [
      { label: 'Cancel', onClick: cancelFunc },
      { label: 'Save', onClick: saveFunc.bind(this, this.state.deviceName, this.state.deviceAddress, deviceId) }
    ];

    return (
      <Dialog
        actions={actions}
        active={isActive}
        onEscKeyDown={cancelFunc}
        onOverlayClick={cancelFunc}
        title={title}
      >
        <Input
          type='text' label='Device Name' name='name' required
          onChange={this.handleChange.bind(this, 'deviceName')}
          value={this.state.deviceName}
          maxLength={40}
        />
        <Input
          type='text' label='Device Address' name='address' required
          onChange={this.handleChange.bind(this, 'deviceAddress')}
          value={this.state.deviceAddress}
        />
      </Dialog>
    );
  }
}

DeviceModal.propTypes = {
  title: PropTypes.string.isRequired,
  deviceId: PropTypes.string.isRequired,
  deviceName: PropTypes.string.isRequired,
  deviceAddress: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
  saveFunc: PropTypes.func.isRequired,
  cancelFunc: PropTypes.func.isRequired,
};

export default DeviceModal;
