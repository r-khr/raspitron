// @flow

import React, { Component, PropTypes } from 'react';
import { List, ListItem } from 'react-toolbox/lib/list';
import { IconButton } from 'react-toolbox/lib/button';

class DeviceList extends Component {
  render() {
    const { devices, linkedDeviceId, linkDevice, deleteDevice } = this.props;
    const deviceList = devices.map((device, index) => {
      let icon;
      const rightActions = [];

      // Loading and unavailable
      if (device.isLoading && !device.isAvailable) {
        icon = (<i key={0} className={'fa fa-cog fa-spin fa-fw'} />);
      } else if (!device.isLoading && device.isAvailable) {
        icon = 'network_wifi';
        rightActions.push((<IconButton key={0} icon='link' accent={device.id === linkedDeviceId} onClick={linkDevice.bind(this, device)} />));
        rightActions.push((<IconButton key={1} icon='edit' />));
        rightActions.push((<IconButton key={2} icon='delete' onClick={deleteDevice.bind(this, device)} />));
      } else {
        icon = 'signal_wifi_off';
        rightActions.push((<IconButton key={1} icon='edit' />));
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
        { deviceList }
      </List>
    );
  }
}

DeviceList.propTypes = {
  linkDevice: PropTypes.func.isRequired,
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
