import React from 'react';
import { Icon } from 'expo';
import { Actions } from 'react-native-router-flux';
import { Font } from '../../styles';
import MoIcon from '../MoIcon/MoIcon';

const toggleDrawer = () => Actions.refresh({ key: 'moiDrawer', open: value => !value });

const ProfileButton = () => <MoIcon name="profile" size={30} onPress={() => Actions.profile()} />; //eslint-disable-line
const HamburgerButton = () => <Icon.Ionicons color="#FFF" name="md-menu" size={30} onPress={toggleDrawer} />; //eslint-disable-line

export default {
  navigationBarStyle: {
    backgroundColor: 'transparent',
    borderBottomWidth: 0,
  },

  rightButtonStyle: {
    top: -6,
    position: 'absolute',
    right: 5,
  },

  titleStyle: {
    color: '#FFF',
    fontSize: 20,
    fontFamily: Font.museo('bolder'),
    top: -25,
  },

  leftButtonStyle: {
    top: -7,
    left: 5,
  },

  renderLeftButton: HamburgerButton,
  renderRightButton: ProfileButton,
};
