// @flow
import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
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
      rule: null,
      isModalActive: false
    };
  }

  render() {
    const { pins, rules, fetchRules, deviceAddress } = this.props;

    const pinList = pins.length > 0 ? rules.map((rule, index) => (
      <PinControl
        key={index}
        rule={rule}
        editPinRule={() => console.log('edit')}
        deletePinRule={() => console.log('delete')}
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
          rule={this.state.rule}
          isActive={this.state.isModalActive}
          saveFunc={() => console.log('save')}
          cancelFunc={() => console.log('cancel')}
        />
        { pinList }
      </div>
    );
  }
}

ControlPage.propTypes = {
  fetchRules: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  pins: PropTypes.array.isRequired,
  rules: PropTypes.array.isRequired,
};


function mapStateToProps(state) {
  return {
    pins: state.pins,
    rules: state.rules,
    isLoading: state.device.isLoading,
    deviceAddress: state.device.address
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ruleActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ControlPage);
