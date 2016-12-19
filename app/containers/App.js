import React, { Component, PropTypes } from 'react';
import { Layout, NavDrawer, Panel, AppBar } from 'react-toolbox';
import Navigation from '../components/navigation';
import Clock from '../components/clock';

import styles from './_container.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drawerActive: false
    };
  }

  toggleDrawerActive = () => {
    this.setState({ drawerActive: !this.state.drawerActive });
  };

  render() {
    return (
      <Layout className={styles.layout}>
        <NavDrawer
          active={this.state.drawerActive}
          permanentAt='xxxl'
          onOverlayClick={this.toggleDrawerActive}
        >
          <Navigation />
        </NavDrawer>
        <Panel className={styles.panel}>
          <AppBar className={styles.bar} leftIcon='menu' onLeftIconClick={this.toggleDrawerActive}>
            <Clock />
          </AppBar>
          { this.props.children }
        </Panel>
      </Layout>
    );
  }
}

App.propTypes = {
  children: PropTypes.element.isRequired
};

export default App;
