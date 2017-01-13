// @flow

import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import { List, ListItem } from 'react-toolbox/lib/list';
import { IconButton } from 'react-toolbox/lib/button';
import { Button } from 'react-toolbox/lib/button';

class PinControl extends Component {
  render() {
    const { title, number, rules, newPinRule, editPinRule, deletePinRule } = this.props;
    const pinRules = Array.isArray(rules) && rules.length > 0 ?
    rules.map((rule, index) => {
      const rightActions = [
        (<IconButton key={0} icon='edit' onClick={editPinRule.bind(this, title, number, rule)} />),
        (<IconButton key={1} icon='delete' onClick={deletePinRule.bind(this, number, rule)} />),
      ];
      return (
        <ListItem
          key={index}
          ripple={false}
          leftIcon={rule.setTo ? 'check' : 'close'}
          caption={moment(rule.time).format('LT')}
          legend={rule.setTo ? 'Turn On' : 'Turn Off'}
          rightActions={rightActions}
        />
      );
    }) : null;

    return (
      <div className={'panel panel-default'}>
        <div className={'panel-heading'}>
          {title}
        </div>
        <div className={'panel-body'}>
          <Button icon='add' label='Add Rule' onClick={newPinRule.bind(this, title, number)} raised primary />
          <List className={'row'}>
            { pinRules }
          </List>
        </div>
      </div>
    );
  }
}

PinControl.propTypes = {
  title: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired,
  rules: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      time: PropTypes.date,
      setTo: PropTypes.bool
    })
  ),
  newPinRule: PropTypes.func.isRequired,
  editPinRule: PropTypes.func.isRequired,
  deletePinRule: PropTypes.func.isRequired
};

export default PinControl;
