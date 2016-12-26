// @flow

import React, { Component } from 'react';
import { List, ListItem } from 'react-toolbox/lib/list';
// import styles from './styles.css';

class Navigation extends Component {
  render() {
    return (
      <List selectable ripple>
        <ListItem leftIcon={'home'} caption={'Dashboard'} to={'#/'} />
        <ListItem leftIcon={'settings'} caption={'Settings'} to={'#/settings'} />
      </List>
    );
  }
}

export default Navigation;
