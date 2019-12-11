import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Image, TouchableOpacity } from 'react-native';
import MoIcon from '../MoIcon/MoIcon';
import withSound from '../../utils/withSound';
import { Size } from '../../styles';
import ProfileAvatar from '../Profile/Profile'

class ProfileImageButton extends Component {

  renderProfileIconWithSound = (profile) => {
    const TouchableOpacityWithSound = withSound(TouchableOpacity);
    return (
      <TouchableOpacityWithSound
        soundName="profile"
        onPress={() => Actions.profile()}
      >
        <ProfileAvatar width={Size.profileAvatarSize} userImageUri={profile.image || profile.avatar}
        />
      </TouchableOpacityWithSound>
    );
  }

  render() {
    const { profile } = this.props;
    return this.renderProfileIconWithSound(profile);
  }
}

const mapStateToProps = state => ({
  profile: state.user.profile
})

export default connect(mapStateToProps)(ProfileImageButton)
