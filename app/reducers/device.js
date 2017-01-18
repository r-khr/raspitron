// @flow
import { fromJS } from 'immutable';
import sortRulesByMinutesOfDate from '../utils/rule';
import {
  LINK_DEVICE,
  ADD_PIN_RULE,
  UPDATE_PIN_RULE,
  DELETE_PIN_RULE,
  ORDER_PIN_RULES,
  SENT_PI_REQUEST,
  RECEIVED_PI_REQUEST
} from '../actions/device';

const INITIAL_STATE = fromJS({
  id: '',
  address: '',
  name: '',
  pins: [],
  isLoading: true
});


export default function status(state = INITIAL_STATE, action) {
  function getPinIndex(number) {
    return state.get('pins').findIndex(pin => pin.get('number') === number);
  }

  function getRuleIndex(pinNumber, ruleId) {
    return state.getIn(['pins', getPinIndex(action.number), 'rules']).findIndex(rule => rule.get('id') === ruleId);
  }

  switch (action.type) {
    case LINK_DEVICE:
      return state.merge({
        id: action.device.id,
        address: action.device.address,
        name: action.device.name
      });
    case SENT_PI_REQUEST:
      return state.set('isLoading', true);
    case RECEIVED_PI_REQUEST:
      return state.merge({
        pins: action.pins,
        isLoading: false
      });
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
