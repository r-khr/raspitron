// @flow
import sortRulesByMinutesOfDate from '../utils/rule';
import {
  ADD_PIN_RULE,
  UPDATE_PIN_RULE,
  DELETE_PIN_RULE,
  ORDER_PIN_RULES,
} from '../actions/device';

export default function status(state = [], action) {
  switch (action.type) {
    case ADD_PIN_RULE:
      return state.updateIn(['pins', getPinIndex(action.number), 'rules'], rules => rules.push(fromJS(action.rule)));
    case UPDATE_PIN_RULE:
      return state.mergeIn(['pins', getPinIndex(action.number), 'rules', getRuleIndex(action.number, action.rule.id)], fromJS(action.rule));
    case DELETE_PIN_RULE:
      return state.deleteIn(['pins', getPinIndex(action.number), 'rules', getRuleIndex(action.number, action.rule.id)]);
    case ORDER_PIN_RULES:
      return state.setIn(['pins', getPinIndex(action.number), 'rules'],
        fromJS(state.getIn(['pins', getPinIndex(action.number), 'rules']).toJS().sort(sortRulesByMinutesOfDate)));
    default:
      return state;
  }
}
