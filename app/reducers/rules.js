// @flow
// import sortRulesByMinutesOfDate from '../utils/rule';
import {
  SET_RULE,
  DELETE_RULE,
  ORDER_RULES,
} from '../actions/rules';

export default function rules(state = [], action) {
  switch (action.type) {
    case SET_RULE:
      return state.map(rule => {
        if (rule.number === action.payload.number) {
          Object.assign({}, rule, action.payload);
        }
        return rule;
      });
    case DELETE_RULE:
      return state.filter(rule => rule.number !== action.payload.number);
    case ORDER_RULES:
      return state.setIn(['pins', getPinIndex(action.number), 'rules'],
        fromJS(state.getIn(['pins', getPinIndex(action.number), 'rules']).toJS().sort(sortRulesByMinutesOfDate)));
    default:
      return state;
  }
}
