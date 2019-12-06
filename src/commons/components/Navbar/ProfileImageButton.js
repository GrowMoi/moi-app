import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Image, TouchableOpacity } from 'react-native';
import MoIcon from '../MoIcon/MoIcon';
import withSound from '../../utils/withSound';
import { Size } from '../../styles';
import ProfileAvatar from '../Profile/Profile'

class ProfileImageButton extends Component {

  renderProfileIconWithSound = (profile, treeLoaded) => {
    const TouchableOpacityWithSound = withSound(TouchableOpacity);
    let profileImage = profile.avatar;
    if (treeLoaded) {
      profileImage = profile.image;
    }

    return (
      <TouchableOpacityWithSound
        soundName="profile"
        onPress={() => Actions.profile()}
      >
        <ProfileAvatar width={Size.profileAvatarSize} userImageUri={profileImage}
        />
      </TouchableOpacityWithSound>
    );
  }

  render() {
    const { profile, treeLoaded } = this.props;
    return this.renderProfileIconWithSound(profile, treeLoaded);
  }
}

const mapStateToProps = state => ({
  profile: state.user.profile,
  treeLoaded: state.tree.treeLoaded,
})

export default connect(mapStateToProps)(ProfileImageButton)
