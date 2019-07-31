import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Image } from 'react-native';
import styled, { css } from 'styled-components/native';
import MaskedView from '@react-native-community/masked-view';
import { getHeightAspectRatio  } from '../../utils'

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

const BackgroundImage = styled.View`
  background-color: #f7fcff;
  width: 100%;
  height: 100%
  position: absolute;
  top: 0;
  left: 0;
`

const ProfileImage = styled(Image)`
  justify-content: center;
  align-items: center;
  overflow: hidden;
  width: 100%;
  height: 100%;
  z-index: 1;
`;

const Frame = styled.Image`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
`

const MaskContainer = styled(MaskedView)`
  height: ${props => props.height || 0};
  width: ${props => props.width || 0};
  flexDirection: row;
`

const MaskImage = styled(Image)`
  height: ${props => props.height || 0};
  width: ${props => props.width || 0};
`

class ProfileAvatar extends Component {
  state = {
    mask: {
      width: 0,
      height: 0,
    }
  }

  componentWillMount() {
    Image.getSize('profile_mask', (width, height) => {
      this.setState({ mask: { width, height } })
    })
  }

  get adjustedMaskWidth() {
    const { width } = this.props;
    const REDUCE_FRAME_IN_PIXELS = 2;
    return width - REDUCE_FRAME_IN_PIXELS;
  }

  render() {
    const { width, userImageUri, round, ...rest } = this.props
    const { mask } = this.state
    const sourceImage = {uri: userImageUri ? userImageUri : 'profile_mask' };
    const MASK_WIDTH = this.adjustedMaskWidth;
    const MASK_HEIGHT = getHeightAspectRatio(mask.width, mask.height, MASK_WIDTH);

    return (
      <ProfileContainer width={width} round={round}>
        <MaskContainer
          height={MASK_HEIGHT}
          width={MASK_WIDTH}
          maskElement={<MaskImage height={MASK_HEIGHT} width={MASK_WIDTH} source={{ uri: 'profile_mask' }} resizeMode='stretch' />}>
          <ProfileImage
            {...rest}
            source={sourceImage}
            resizeMode='cover'
            />
          <BackgroundImage />
        </MaskContainer>
        <Frame source={{ uri: 'profile_frame' }}/>
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
