
import React, { Component } from 'react';
import { View, Image } from 'react-native';
import MaskedView from '@react-native-community/masked-view';
import styled from 'styled-components/native';

const BackgroundImage = styled(View)`
  background-color: #f7fcff;
  width: 100%;
  height: 100%
  position: absolute;
  top: 0;
  left: 0;
`

const StyledImage = styled(Image)`
  justify-content: center;
  align-items: center;
  overflow: hidden;
  width: 100%;
  height: 100%;
  z-index: 1;
`;

const MaskContainer = styled(MaskedView)`
  height: ${props => props.height || 0};
  width: ${props => props.width || 0};
  flexDirection: row;
`

const MaskImageContainer = styled(View)`
  flex: 1;
`

const MaskImage = styled(Image)`
  height: ${props => props.height || 0};
  width: ${props => props.width || 0};
`

const Frame = styled.Image`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
`

class ProfileImage extends Component {

  render() {
    const {height, width, sourceImage, ...rest } = this.props;

    return (
      <React.Fragment>
        <MaskContainer
        height={height}
        width={width}
        maskElement={
          <MaskImageContainer>
            <MaskImage  height={height} width={width} source={{uri: 'profile_mask'}} />
          </MaskImageContainer>
        }
        >
        <StyledImage
          {...rest}
          source={sourceImage}
          resizeMode='cover'
          />
        <BackgroundImage />
        </MaskContainer>
        <Frame source={{ uri: 'profile_frame' }}/>
      </React.Fragment>
    )
  }
}

export default ProfileImage;
