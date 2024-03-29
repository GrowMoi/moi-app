import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Platform, TouchableOpacity } from 'react-native';
import { Font } from '../../styles';
import styled from 'styled-components/native';
import ProfileImageButton from './ProfileImageButton';
import { Size } from '../../styles';

//REDUX
import store from '../../../store'
import * as sideActions from '../../../actions/sideActions'


const IconContainer = styled(TouchableOpacity)`
  width:  ${Size.hamburgerContainerWidth};
  height: ${Size.hamburgerContainerHeigth};
  margin-left: -15px;
  justify-content: center;
  align-items: center;
  zIndex: 1;
  background-color: transparent;
`;

// const toggleDrawer = () => Actions.refresh({ key: 'moiDrawer', open: value => !value });

const ProfileButton = () => <ProfileImageButton />; //eslint-disable-line
export const HamburgerButton = () => (
  <IconContainer onPress={() => {
      store.dispatch(sideActions.sideMenuOpen());
    }}>
    <Ionicons color="#FFF" name="md-menu" size={Size.hamburgerSize} />
  </IconContainer>
); //eslint-disable-line

export default {
  navigationBarStyle: {
    backgroundColor: 'transparent',
    borderBottomWidth: 0,
  },

  rightButtonStyle: {
    top: Size.mavbarTopSpace - 6,
    position: 'absolute',
    right: 5,
  },

  titleStyle: {
    color: '#FFF',
    fontSize: Size.fontHeader,
    width: '55%',
    fontFamily: Font.museo('bolder'),
    ...Platform.select({
      ios: {
        top: Size.mavbarTopSpace - 25 ,
      },
      android: {
        top: -10,
      },
    }),
  },

  leftButtonStyle: {
    top: Size.mavbarTopSpace - 7,
    left: 5,
  },

  renderLeftButton: HamburgerButton,
  renderRightButton: ProfileButton,
};
