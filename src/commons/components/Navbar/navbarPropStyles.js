import React from 'react';
import { Icon } from 'expo';
import { Platform, Dimensions, Image, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Font } from '../../styles';
import MoIcon from '../MoIcon/MoIcon';
import store from '../../../store';
import withSound from '../../utils/withSound';
import styled from 'styled-components';

const IconContainer = styled(TouchableOpacity)`
  width: 60px;
  height: 38px;
  margin-left: -15px;
  justify-content: center;
  align-items: center;
  zIndex: 1;
  background-color: transparent;
`;

const toggleDrawer = () => Actions.refresh({ key: 'moiDrawer', open: value => !value });

const renderProfileIconWithSound = (profile) => {
    const TouchableOpacityWithSound = withSound(TouchableOpacity);

    return (
      <TouchableOpacityWithSound
        soundName="profile"
        onPress={() => Actions.profile()}
      >
        <Image
          style={{
            width: 30,
            height: 30,
            borderRadius: 15,
          }}
          source={{uri: profile.image}}
        />
      </TouchableOpacityWithSound>
    );
  }

const ProfileButton = () => {
  const user = store.getState().user || {};
  const userData = user.userData || {};
  const profile = userData.profile || {};

  if (profile.image) {
    return renderProfileIconWithSound(profile);
  } else {
    return (<MoIcon name="profile" size={30} onPress={() => Actions.profile()} />)
  }
}; //eslint-disable-line
const HamburgerButton = () => (
    <IconContainer onPress={toggleDrawer}>
      <Icon.Ionicons color="#FFF" name="md-menu" size={30} />
    </IconContainer>
  ); //eslint-disable-line

const { width } = Dimensions.get('window');

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
    width: width < 320 ? 150 : 180,
    fontFamily: Font.museo('bolder'),
    ...Platform.select({
      ios: {
        top: -25,
      },
      android: {
        top: -10,
      },
    }),
  },

  leftButtonStyle: {
    top: -7,
    left: 5,
  },

  renderLeftButton: HamburgerButton,
  renderRightButton: ProfileButton,
};
