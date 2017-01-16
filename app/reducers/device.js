// @flow
import { Map } from 'immutable';
import sortRulesByMinutesOfDate from '../utils/rule';
import {
  LINK_DEVICE,
  SET_PIN_RULE,
  DELETE_PIN_RULE,
  ORDER_PIN_RULES,
  SENT_PI_REQUEST,
  RECEIVED_PI_REQUEST
} from '../actions/device';

const INITIAL_STATE = Map({
  id: '',
  address: '',
  name: '',
  pins: [],
  isLoading: true
});


export default function status(state = INITIAL_STATE, action) {
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
    case SET_PIN_RULE:
      return Object.assign({}, state, {
        pins: state.pins.map(pin => {
          if (pin.number === action.number) {
            if (pin.rules.find(rule => rule.id === action.rule.id) !== undefined) {
              return Object.assign({}, pin, {
                rules: pin.rules.map(rule => {
                  if (rule.id === action.rule.id) {
                    return Object.assign({}, rule, {
                      time: action.rule.time,
                      setTo: action.rule.setTo
                    });
                  }
                  return rule;
                })
              });
            }
            return Object.assign({}, pin, {
              rules: [
                ...pin.rules,
                action.rule
              ]
            });
          }
          return pin;
        })
      });
    case DELETE_PIN_RULE:
      return Object.assign({}, state, {
        pins: state.pins.map(pin => {
          if (pin.number === action.number) {
            return Object.assign({}, pin, {
              rules: pin.rules.filter(rule => rule !== action.rule)
            });
          }
          return pin;
        })
      });
    case ORDER_PIN_RULES:
      return Object.assign({}, state, {
        pins: state.pins.map(pin => {
          if (pin.number === action.number) {
            return Object.assign({}, pin, {
              rules: pin.rules.sort(sortRulesByMinutesOfDate)
            });
          }
          return pin;
        })
      });
    default:
      return state;
  }
}
