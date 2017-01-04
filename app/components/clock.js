// @flow
import moment from 'moment';
import React, { Component } from 'react';
import styles from './styles.css';

class Clock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: ''
    };
  }

  componentWillMount() {
    this.setTime();
  }

  componentDidMount() {
    this.loadInterval = setInterval(() => {
      this.setTime();
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.loadInterval);
  }

  setTime() {
    const date = moment().format('dddd MMM Do');
    const time = moment().format('h:mm A');

    this.setState({
      date,
      time
    });
  }

  render() {
    return (
      <div className={styles.clock}>
        <div className={styles.date}>{this.state.date}</div>
        <div className={styles.time}>{this.state.time}</div>
      </div>
    );
  }
}

export default Clock;
