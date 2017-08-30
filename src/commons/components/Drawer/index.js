import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Drawer from 'react-native-drawer';
import { Actions, DefaultRenderer } from 'react-native-router-flux';
import { LANDSCAPE, DRAWER_OFFSET } from '../../../constants';
import SideMenu from './SideMenu';


@connect(store => ({ device: store.device }))
export default class Menu extends Component {
  render() {
    const { device } = this.props;
    const { orientation } = device.dimensions;
    const state = this.props.navigationState;
    const children = state.children;
    const currentOffset = orientation === LANDSCAPE ? 0.6 : 0.26;

    const drawerStyles = {
      drawer: { shadowColor: '#000000', shadowOpacity: 0.3, shadowRadius: 4 },
    };

    return (
      <Drawer
        ref="navigation" // eslint-disable-line
        open={state.open}
        onOpen={() => Actions.refresh({ key: state.key, open: true })} // eslint-disable-line
        onClose={() => Actions.refresh({ key: state.key, open: false })} // eslint-disable-line
        type="displace"
        content={<SideMenu />}
        tapToClose
        openDrawerOffset={(viewport) => viewport.width - DRAWER_OFFSET} // eslint-disable-line
        panCloseMask={currentOffset}
        negotiatePan
        styles={drawerStyles}
        tweenHandler={ratio => ({ // eslint-disable-line
          main: { opacity: Math.max(0.54, 1 - ratio) },
        })}>
        <DefaultRenderer navigationState={children[0]} onNavigate={this.props.onNavigate} />
      </Drawer>
    );
  }
}

Menu.propTypes = {
  device: PropTypes.object,
  onNavigate: PropTypes.any,
};
