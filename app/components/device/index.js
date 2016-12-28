// @flow

import React, { Component } from 'react';
import { Card, CardTitle, CardText } from 'react-toolbox/lib/card';

import styles from './styles.css';

class Device extends Component {
  render() {
    return (
      <Card className={styles.device}>
        <CardTitle
          title="Avatar style title"
          subtitle="Subtitle here"
        />
        <CardText>
          Stuff
        </CardText>
      </Card>
    );
  }
}

export default Device;
