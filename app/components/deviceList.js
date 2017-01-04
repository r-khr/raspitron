// @flow

import React, { Component, PropTypes } from 'react';
import { List, ListItem } from 'react-toolbox/lib/list';
import { IconButton } from 'react-toolbox/lib/button';

class DeviceList extends Component {
  render() {
    const { devices, deviceId, linkDevice } = this.props;
    const deviceList = devices.map((device, index) => {
      const icon = device.available ? 'network_wifi' : 'signal_wifi_off';
      const rightActions = [
        <IconButton key={0} icon='link' accent={device.id === deviceId} onClick={linkDevice.bind(this, device)} />,
        // <IconButton key={1} icon='edit' />,
        // <IconButton key={2} icon='delete' />
      ];
      return (
        <ListItem
          key={index}
          ripple={false}
          leftIcon={icon}
          rightActions={rightActions}
          caption={device.name}
          legend={device.address}
          disabled={!device.available}
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
  deviceId: PropTypes.string,
  devices: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      address: PropTypes.string
    })
  ).isRequired
};

export default DeviceList;
