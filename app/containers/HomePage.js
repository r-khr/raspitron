// @flow
import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PinList from '../components/pinList';
import * as statusActions from '../actions/status';

// ------------------------------------------------------
// Home Page
// ------------------------------------------------------
// This page provides interaction with device pins.
//
// ------------------------------------------------------

class HomePage extends Component {
  componentWillMount() {
    this.props.fetchPins();
  }

  render() {
    const { pins, isLoading, setPin } = this.props;
    const pinList = Array.isArray(pins) && pins.length > 0 ? (
      <PinList
        pins={pins}
        isLoading={isLoading}
        setPin={setPin}
      />
    ) : (
      <div className={'row'}>
        <p className={'col col-sm-12'}>Pins have not loaded.</p>
      </div>
    );

    return (
      <div>
        <div className={'page-header'}>
          <h3>
            List of Pins
          </h3>
        </div>
        { pinList }
      </div>
    );
  }
}

HomePage.propTypes = {
  fetchPins: PropTypes.func.isRequired,
  setPin: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  pins: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      number: PropTypes.number,
      state: PropTypes.state
    })
  ).isRequired,
};


function mapStateToProps(state) {
  return {
    pins: state.status.pins,
    isLoading: state.status.isLoading,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(statusActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
