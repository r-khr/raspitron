// @flow

import React, { Component, PropTypes } from 'react';
import { List, ListItem } from 'react-toolbox/lib/list';
import { Button } from 'react-toolbox/lib/button';
import PinRuleModal from './pinRuleModal';

class PinControl extends Component {
  constructor(props) {
    super(props);

    this.state = {
      time: new Date(),
      setTo: false,
      isModalActive: false
    };
  }

  openModalFunc() {
    this.setState({
      isModalActive: true
    });
  }

  editModalFunc(rule) {
    this.setState({
      time: rule.time,
      setTo: rule.setTo,
      isModalActive: true
    });
  }

  cancelModalFunc() {
    this.setState({
      isModalActive: false
    });
  }

  savePinRuleFunc(time, setTo) {
    this.setState({
      isModalActive: false
    });
    console.log(time, setTo);
  }

  render() {
    const { title, rules } = this.props;
    const pinRules = Array.isArray(rules) && rules.length > 0 ?
    rules.map((rule, index) => {
      return (
        <ListItem
          key={index}
          ripple={false}
          leftIcon={'logo'}
          rightActions={'stff'}
          caption={rule.time}
        />
      );
    }) : null;

    return (
      <div className={'panel panel-default'}>
        <div className={'panel-heading'}>
          {title}
        </div>
        <div className={'panel-body'}>
          <Button icon='add' label='Add Rule' onClick={this.openModalFunc.bind(this)} raised primary />
          <List className={'row'}>
            { pinRules }
          </List>
        </div>
        <PinRuleModal
          title={title}
          time={this.state.time}
          setTo={this.state.setTo}
          isActive={this.state.isModalActive}
          saveFunc={this.savePinRuleFunc.bind(this)}
          cancelFunc={this.cancelModalFunc.bind(this)}
        />
      </div>
    );
  }
}

PinControl.propTypes = {
  title: PropTypes.string.isRequired,
  rules: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      time: PropTypes.string,
      isOn: PropTypes.bool
    })
  )
};

export default PinControl;
