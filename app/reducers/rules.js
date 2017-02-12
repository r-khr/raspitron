// @flow
import sortRulesByMinutesOfDate from '../utils/rule';

import {
  SET_RULES,
  ORDER_RULES,
} from '../actions/rules';

export default function rules(state = [], action) {
  switch (action.type) {
    case SET_RULES:
      return action.payload;
    case ORDER_RULES:
      return state.sort(sortRulesByMinutesOfDate);
    default:
      return state;
  }
}
