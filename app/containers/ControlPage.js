// @flow
import React, { Component, PropTypes } from 'react';
import { Button } from 'react-toolbox/lib/button';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ruleActions from '../actions/rules';
import RuleList from '../components/ruleList';
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

    const ruleList = (
      <RuleList
        rules={rules}
        editRule={() => console.log('edit')}
        deleteRule={() => console.log('delete')}
      />
    );
    
    const notConnected = (
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
          saveFunc={() => console.log('save')}
          cancelFunc={() => console.log('cancel')}
        />
        <Button icon='add' label='Add Rule' onClick={() => console.log('stuff')} raised primary />
        { ruleList }
        { notConnected }
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
