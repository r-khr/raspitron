// @flow

import React, { Component } from 'react';
import RtNavigation from 'react-toolbox/lib/navigation';
import RtLink from 'react-toolbox/lib/link';
import styles from './styles.css';

class Navigation extends Component {
  render() {
    return (
      <RtNavigation type='vertical' className={styles.light}>
        <RtLink className={styles.link} href="#/">
          Dashboard
        </RtLink>
        <RtLink className={styles.link} href="#/timer">
          Timer
        </RtLink>
      </RtNavigation>
    );
  }
}

export default Navigation;
