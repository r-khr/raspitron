// @flow

import React, { Component, PropTypes } from 'react';
import { List, ListItem } from 'react-toolbox/lib/list';
// import styles from './styles.css';

class Navigation extends Component {
  render() {
    const { goto } = this.props;
    const routes = [
      {
        icon: 'home',
        caption: 'Dashboard',
        route: '/'
      },
      {
        icon: 'dvr',
        caption: 'Control',
        route: '/control'
      },
      {
        icon: 'settings',
        caption: 'Settings',
        route: '/settings'
      }
    ];

    const navItems = routes.map((item) => {
      const index = routes.indexOf(item);
      function transition() {
        window.location.href = '#' + item.route;
        goto();
      }
      return (
        <ListItem
          key={index}
          leftIcon={item.icon}
          caption={item.caption}
          onClick={transition}
        />
      );
    });

    return (
      <List selectable ripple>
        { navItems }
      </List>
    );
  }
}

Navigation.propTypes = {
  goto: PropTypes.func.isRequired
};

export default Navigation;
