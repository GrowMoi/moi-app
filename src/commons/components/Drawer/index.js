import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import Drawer from 'react-native-drawer';
import { Actions, DefaultRenderer } from 'react-native-router-flux';

const TabView = () => (
  <View>
    <TouchableOpacity onPress={() => Actions.profile()}><Text>TabView</Text></TouchableOpacity>
  </View>
);

export default class Menu extends Component {
  render() {
    const state = this.props.navigationState;
    const children = state.children;
    return (
      <Drawer
        ref="navigation" // eslint-disable-line
        open={state.open}
        onOpen={() => Actions.refresh({ key: state.key, open: true })} // eslint-disable-line
        onClose={() => Actions.refresh({ key: state.key, open: false })} // eslint-disable-line
        type="displace"
        content={<TabView />}
        tapToClose
        openDrawerOffset={0.2}
        panCloseMask={0.2}
        negotiatePan
        tweenHandler={ratio => ({ // eslint-disable-line
          main: { opacity: Math.max(0.54, 1 - ratio) },
        })}>
        <DefaultRenderer navigationState={children[0]} onNavigate={this.props.onNavigate} />
      </Drawer>
    );
  }
}
