import React, { Component } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components/native';
import Drawer from 'react-native-drawer';
import { Actions, DefaultRenderer } from 'react-native-router-flux';

import { colors } from '../../styles/palette';
import { Size, Palette } from '../../styles';
import MoIcon from '../MoIcon/MoIcon';
import { Header } from '../Typography';
import { LANDSCAPE } from '../../../constants';

const SideMenuContainer = styled(View)`
  flex: 1;
  padding-vertical: ${Size.spaceSmall};
  background-color: ${colors.darkGreen};
`;

const SideBarMenuHeader = styled(View)`
  padding-horizontal: ${Size.spaceMedium};
  padding-bottom: ${Size.spaceSmall};
  border-bottom-width: 1;
  border-bottom-color: ${Palette.white.alpha(0.1).css()};
  flex-direction: row;
`;

const SideBarTitleContainer = styled(View)`
  flex: 1;
  align-items: center;
  padding-right: 20;
`;

const SideMenu = () => (
  <SideMenuContainer>
    <SideBarMenuHeader>
      <MoIcon name='treeIcon' size={28} />

      <SideBarTitleContainer>
        <Header inverted>Menú</Header>
      </SideBarTitleContainer>
    </SideBarMenuHeader>
  </SideMenuContainer>
);

@connect(store => ({ device: store.device }))
export default class Menu extends Component {
  render() {
    const { device } = this.props;
    const { orientation } = device.dimensions;
    const state = this.props.navigationState;
    const children = state.children;
    const currentOffset = orientation === LANDSCAPE ? 0.6 : 0.2;

    return (
      <Drawer
        ref="navigation" // eslint-disable-line
        open={state.open}
        onOpen={() => Actions.refresh({ key: state.key, open: true })} // eslint-disable-line
        onClose={() => Actions.refresh({ key: state.key, open: false })} // eslint-disable-line
        type="displace"
        content={<SideMenu />}
        tapToClose
        openDrawerOffset={currentOffset}
        panCloseMask={currentOffset}
        negotiatePan
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
};
