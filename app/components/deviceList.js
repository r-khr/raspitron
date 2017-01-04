// @flow

import React, { Component, PropTypes } from 'react';
import { List, ListItem } from 'react-toolbox/lib/list';
// import { IconButton } from 'react-toolbox/lib/button';

class DeviceList extends Component {
  render() {
    // const leftActions = [
    //   <IconButton key={0} icon='edit' />,
    //   <IconButton key={1} icon='delete' />
    // ];
    const { devices } = this.props;
    const deviceList = devices.map((device, index) => {
      const icon = device.available ? 'network_wifi' : 'signal_wifi_off';
      return (
        <ListItem
          key={index}
          ripple={false}
          leftIcon={icon}
          // rightActions={leftActions}
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
  devices: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      address: PropTypes.string
    })
  ).isRequired
};

export default DeviceList;
