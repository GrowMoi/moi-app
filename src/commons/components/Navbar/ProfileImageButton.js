import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Image, TouchableOpacity } from 'react-native';
import MoIcon from '../MoIcon/MoIcon';
import withSound from '../../utils/withSound';

@connect(store => ({
  profile: store.user.profile,
}), {})
export default class ProfileImageButton extends Component {

  renderProfileIconWithSound = (profile) => {
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
          source={{ uri: profile.image }}
        />
      </TouchableOpacityWithSound>
    );
  }

  render() {
    const { profile } = this.props;

    if (profile.image) {
      return this.renderProfileIconWithSound(profile);
    } else {
      return (<MoIcon name="profile" size={30} onPress={() => Actions.profile()} />)
    }
  }
}
