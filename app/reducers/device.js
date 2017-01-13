// @flow
import {
  LINK_DEVICE,
  SET_PIN_RULE,
  DELETE_PIN_RULE,
  SENT_PI_REQUEST,
  RECEIVED_PI_REQUEST
} from '../actions/device';

const INITIAL_STATE = {
  id: '',
  address: '',
  name: '',
  pins: [],
  isLoading: true
};

export default function status(state = INITIAL_STATE, action) {
  switch (action.type) {
    case LINK_DEVICE:
      return Object.assign({}, state, {
        id: action.device.id,
        address: action.device.address,
        name: action.device.name
      });
    case SENT_PI_REQUEST:
      return Object.assign({}, state, {
        isLoading: true
      });
    case RECEIVED_PI_REQUEST:
      return Object.assign({}, state, {
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
    default:
      return state;
  }
}
