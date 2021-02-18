import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Image } from 'react-native';
import styled, { css } from 'styled-components/native';
import MaskedView from '@react-native-community/masked-view';
import { getHeightAspectRatio  } from '../../utils'
import ProfileImage from'./ProfileImage';

const rounded = ({ round }) => {
  return round && css`
    border-radius: 50;
    overflow: hidden;
  `
}

const ProfileContainer = styled(View)`
  position: relative;
  align-items: center;
  justify-content: flex-start;
  width: ${props => props.width};
  height: ${props => props.width};
  ${rounded}
`;

const Frame = styled.Image`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
`

class ProfileAvatar extends Component {
  state = {
    mask: {
      width: 458,
      height: 374,
    }
  }

  get adjustedMaskWidth() {
    const { width } = this.props;
    const REDUCE_FRAME_IN_PIXELS = 2;
    return width - REDUCE_FRAME_IN_PIXELS;
  }

  render() {
    const { width, userImageUri, round, ...rest } = this.props
    const { mask } = this.state
    const MASK_WIDTH = this.adjustedMaskWidth;
    const MASK_HEIGHT = getHeightAspectRatio(mask.width, mask.height, MASK_WIDTH);

    let avatar = 'placeholder_profile_red'
    const sourceImage = {uri: userImageUri ? userImageUri : avatar };

    const profilePhoto = (
      <ProfileImage
        height={MASK_HEIGHT}
        width={MASK_WIDTH}
        sourceImage={sourceImage}
        {...rest}/>
    )

    const placeholder = (
      <Frame source={{ uri: 'profile_photo' }} />
    )

    return (
      <ProfileContainer width={width} round={round}>
        {userImageUri ? profilePhoto : placeholder}
      </ProfileContainer>
    );
  }
}

ProfileAvatar.propTypes = {
  width: PropTypes.number,
};

ProfileAvatar.defaultProps = {
  width: 70,
};

export default ProfileAvatar;
