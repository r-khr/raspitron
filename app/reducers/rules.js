// @flow
// import sortRulesByMinutesOfDate from '../utils/rule';
import {
  ADD_PIN_RULE,
  UPDATE_PIN_RULE,
  DELETE_PIN_RULE,
  ORDER_PIN_RULES,
} from '../actions/rules';

export default function rules(state = [], action) {
  switch (action.type) {
    case ADD_PIN_RULE:
    case UPDATE_PIN_RULE:
      return state.map(rule => {
        if (rule.number === action.payload.number) {
          Object.assign({}, rule, action.payload);
        }
        return rule;
      });
    case DELETE_PIN_RULE:
      return state.filter(rule => rule.number !== action.payload.number);
    case ORDER_PIN_RULES:
      return state.setIn(['pins', getPinIndex(action.number), 'rules'],
        fromJS(state.getIn(['pins', getPinIndex(action.number), 'rules']).toJS().sort(sortRulesByMinutesOfDate)));
    default:
      return state;
  }
}
