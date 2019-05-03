import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Drawer from 'react-native-drawer';
import { Actions, DefaultRenderer } from 'react-native-router-flux';
import { LANDSCAPE, DRAWER_OFFSET } from '../../../constants';
import SideMenu from './SideMenu';

import userActions from '../../../actions/userActions';

@connect(store => ({
  device: store.device,
}), ({
  setDrawerState: userActions.setDrawerState,
}))
export default class Menu extends Component {
  state = {
    sideMenu: 0,
  }

  onOpenDrawer = () => {
    const { navigationState: state, setDrawerState} = this.props
    Actions.refresh({ key: state.key, open: true });
    setDrawerState(true);
  }

  onCloseDrawer = () => {
    const { navigationState: state, setDrawerState} = this.props
    Actions.refresh({ key: state.key, open: false });
    setDrawerState(false);
  }

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
        ref={ref => this.drawer = ref} // eslint-disable-line
        open={state.open}
        onOpen={this.onOpenDrawer} // eslint-disable-line
        onClose={this.onCloseDrawer} // eslint-disable-line
        type="static"
        content={<SideMenu onPressOption={() => {
          setTimeout(() => {
            this.drawer.close();
          }, 150);
        }} />}
        tweenDuration={100}
        tapToClose
        openDrawerOffset={(viewport) => viewport.width - DRAWER_OFFSET} // eslint-disable-line
        panCloseMask={currentOffset}
        styles={drawerStyles}
        tweenHandler={ratio => ({ // eslint-disable-line
          main: { opacity: Math.max(0.54, 1 - ratio) },
        })}
        >
        <DefaultRenderer navigationState={children[0]} onNavigate={this.props.onNavigate} />
      </Drawer>
    );
  }
}

Menu.propTypes = {
  device: PropTypes.object,
  onNavigate: PropTypes.any,
};
