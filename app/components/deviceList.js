// @flow

import React, { Component, PropTypes } from 'react';
import { List, ListItem } from 'react-toolbox/lib/list';
import { IconButton } from 'react-toolbox/lib/button';
import DeviceModal from './deviceModal';

class DeviceList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      deviceId: '',
      deviceName: '',
      deviceAddress: '',
      isModalActive: false
    };
  }

  openModalFunc(device) {
    this.setState({
      isModalActive: true,
      deviceId: device.id,
      deviceName: device.name,
      deviceAddress: device.address
    });
  }

  cancelModalFunc() {
    this.setState({
      isModalActive: false
    });
  }

  saveDeviceFunc(name, address, id) {
    console.log(name, address);
    this.setState({
      isModalActive: false
    });
    this.props.updateDevice({
      name,
      address,
      id
    });
  }

  render() {
    const { devices, linkedDeviceId, connectToDevice, deleteDevice } = this.props;
    const deviceList = devices.map((device, index) => {
      let icon;
      const rightActions = [];

      // Loading and unavailable
      if (device.isLoading && !device.isAvailable) {
        icon = (<i className={'material-icons fa-spin'}>loop</i>);
      } else if (!device.isLoading && device.isAvailable) {
        icon = 'network_wifi';
        rightActions.push((<IconButton key={0} icon='link' accent={device.id === linkedDeviceId} onClick={connectToDevice.bind(this, device)} />));
        rightActions.push((<IconButton key={1} icon='edit' onClick={this.openModalFunc.bind(this, device)} />));
        rightActions.push((<IconButton key={2} icon='delete' onClick={deleteDevice.bind(this, device)} />));
      } else {
        icon = 'signal_wifi_off';
        rightActions.push((<IconButton key={1} icon='edit' onClick={this.openModalFunc.bind(this, device)} />));
        rightActions.push((<IconButton key={2} icon='delete' onClick={deleteDevice.bind(this, device)} />));
      }

      return (
        <ListItem
          key={index}
          ripple={false}
          leftIcon={icon}
          rightActions={rightActions}
          caption={device.name}
          legend={device.address}
        />
      );
    });

    return (
      <List className={'row'}>
        <DeviceModal
          title={'Update'}
          deviceId={this.state.deviceId}
          deviceName={this.state.deviceName}
          deviceAddress={this.state.deviceAddress}
          isActive={this.state.isModalActive}
          saveFunc={this.saveDeviceFunc.bind(this)}
          cancelFunc={this.cancelModalFunc.bind(this)}
        />
        { deviceList }
      </List>
    );
  }
}

DeviceList.propTypes = {
  connectToDevice: PropTypes.func.isRequired,
  updateDevice: PropTypes.func.isRequired,
  deleteDevice: PropTypes.func.isRequired,
  linkedDeviceId: PropTypes.string,
  devices: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      address: PropTypes.string,
      isLoading: PropTypes.bool,
      isAvailable: PropTypes.bool
    })
  ).isRequired
};

export default DeviceList;
