import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

import styled from 'styled-components/native';
import SideMenu from 'react-native-side-menu';
import Menu from './Menu';

const Container = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #f5fcff;
`;

const Instructions = styled(Text)`
  text-align: center;
  color: #333;
  margin-bottom: 5;
`;

const Button = styled(TouchableOpacity)`
  position: absolute;
  top: 20;
  padding-horizontal: 10;
  padding-vertical: 10;
`;

export default class SideBar extends Component {
  state = {
    isOpen: false,
    selectedItem: 'About',
  };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  updateMenuState = (isOpen) => {
    this.setState({ isOpen });
  }

  onMenuItemSelected = (item) => {
    this.setState({
      isOpen: false,
      selectedItem: item,
    });
  }

  render() {
    const menu = <Menu onItemSelected={this.onMenuItemSelected} />;

    return (
      <SideMenu
        menu={menu}
        isOpen={this.state.isOpen}
        onChange={this.updateMenuState}
      >
        <Container>
          <Instructions>
            Current selected menu item is: {this.state.selectedItem}
          </Instructions>
        </Container>

        <Button onPress={this.toggle}>
          <Text>Toggle</Text>
        </Button>
      </SideMenu>
    );
  }
}
