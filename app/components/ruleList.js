// @flow

import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import { List, ListItem } from 'react-toolbox/lib/list';
import { IconButton } from 'react-toolbox/lib/button';

function RuleList({
  rules,
  editRule,
  deleteRule
}) {
  const rightActions = [
    (<IconButton key={0} icon='edit' onClick={editRule} />),
    (<IconButton key={1} icon='delete' onClick={deleteRule} />),
  ];
  debugger;
  const listItems = rules.map((rule, index) => {
    
    return (
      <ListItem
        key={index}
        ripple={false}
        leftIcon={rule.set_to ? 'check' : 'close'}
        caption={moment(rule.time).format('LT')}
        legend={rule.set_to ? 'Turn On' : 'Turn Off'}
        rightActions={rightActions}
      />
    );
  });

  return (
    <List className={'row'}>
      {listItems}
    </List>
  );
}

RuleList.propTypes = {
  rules: PropTypes.array.isRequired,
  editRule: PropTypes.func.isRequired,
  deleteRule: PropTypes.func.isRequired
};

export default RuleList;
