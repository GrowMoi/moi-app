import React, { Component } from 'react';
import { Image } from 'react-native';
import styled from 'styled-components/native';

const StyledImage = styled(Image)`
  justify-content: center;
  align-items: center;
  overflow: hidden;
  width: 100%;
  height: 100%;
  z-index: 1;
  border-color: #1d2111;
`;

const Frame = styled.Image`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 2;
`

class ProfileImage extends Component {

  render() {
    const {height, width, sourceImage, ...rest } = this.props;
    return (
      <React.Fragment>
        <StyledImage
          {...rest}
          source={sourceImage}
          resizeMode='cover'
          style= {{
            borderTopRightRadius: width / 4,
            borderBottomLeftRadius: width / 2,
            borderBottomRightRadius: width / 2,
            borderTopLeftRadius: width / 5,
            borderWidth: (width * 2) / 20
          }}
        />
        <Frame source={{ uri: 'profile_frame' }}/>
      </React.Fragment>
    )
  }
}
export default ProfileImage;
