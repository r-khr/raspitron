// @flow
import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import Guid from 'guid';
import { connect } from 'react-redux';
import * as ruleActions from '../actions/rules';
import PinControl from '../components/pinControl';
import PinRuleModal from '../components/pinRuleModal';


// ---------------------------------------------------------
// Control Page
// ---------------------------------------------------------
// This page provides programmatic control with device pins.
//
// ---------------------------------------------------------

class ControlPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      time: new Date(),
      setTo: false,
      isModalActive: false
    };
  }

  newPinRule(title, number) {
    this.setState({
      title,
      number,
      id: Guid.raw(),
      isModalActive: true
    });
  }

  editPinRule(title, number, rule) {
    this.setState({
      title,
      number,
      id: rule.id,
      time: rule.time,
      setTo: rule.setTo,
      isModalActive: true
    });
  }

  updateRule(name, value) {
    this.setState({
      [name]: value
    });
  }

  cancelModalFunc() {
    this.setState({
      isModalActive: false
    });
  }

  savePinRuleFunc() {
    this.setState({
      isModalActive: false
    });

    const rule = {
      id: this.state.id,
      time: this.state.time,
      setTo: this.state.setTo
    };

    const pin = this.props.pins.find(p => p.number === this.state.number);
    const ruleExists = pin.rules.filter(r => r.id === rule.id).length > 0;

    if (ruleExists) {
      this.props.updatePinRuleAndOrder(this.state.number, rule);
    } else {
      this.props.addPinRuleAndOrder(this.state.number, rule);
    }
  }

  render() {
    const { pins, deletePinRuleAndOrder } = this.props;
    const pinList = Array.isArray(pins) && pins.length > 0 ? this.props.pins.map((pin, index) => (
      <PinControl
        key={index}
        title={pin.name}
        number={pin.number}
        rules={pin.rules}
        newPinRule={this.newPinRule.bind(this)}
        editPinRule={this.editPinRule.bind(this)}
        deletePinRule={deletePinRuleAndOrder.bind(this)}
      />
    )) : (
      <div className={'row'}>
        <p className={'col col-sm-12'}>Pins have not loaded.</p>
      </div>
    );

    return (
      <div>
        <div className={'page-header'}>
          <h3>
            Programmatic Pin Control
          </h3>
        </div>
        <PinRuleModal
          title={this.state.title}
          time={this.state.time}
          setTo={this.state.setTo}
          updateRuleFunc={this.updateRule.bind(this)}
          isActive={this.state.isModalActive}
          saveFunc={this.savePinRuleFunc.bind(this)}
          cancelFunc={this.cancelModalFunc.bind(this)}
        />
        { pinList }
      </div>
    );
  }
}

ControlPage.propTypes = {
  setPinRule: PropTypes.func.isRequired,
  deletePinRule: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  pins: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      number: PropTypes.number,
      state: PropTypes.state,
    })
  ).isRequired,
  rules: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      time: PropTypes.date,
      setTo: PropTypes.bool,
    })
  )
};


function mapStateToProps(state) {
  return {
    pins: state.pins,
    rules: state.rules,
    isLoading: state.device.isLoading
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ruleActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ControlPage);
