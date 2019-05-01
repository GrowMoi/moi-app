import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, ImageBackground, Image } from 'react-native';
import styled from 'styled-components/native';
import { getHeightAspectRatio } from '../../utils';

const heightProfile = 65;
const widthProfile = 62;
const TreeContainer = styled(ImageBackground)`
  justify-content: center;
  align-items: center;
  width: auto;
  height: auto;
`;

const ImageContainer = styled(View)`
  width: ${props => props.width};
  height: ${props => props.height};
  justify-content: center;
  align-items: center;
`;

const ProfileImage = styled(Image)`
  width: ${props => props.width};
  height: ${props => props.height};
`;

export default class TreeScreenShot extends Component {

  render() {
    const { width, height, profileImage, treeBackground, style, frame } = this.props;

    const heightTree = height ? frame ? height - 20 : height : 170;

    return (
      <View style={style}>
        <TreeContainer width={width}
          source={treeBackground}
          resizeMode='stretch'
        >
          <ImageContainer width={width}
              height={heightTree}>
            <ProfileImage
              width={frame ? width - 50 : width -30}
              height={heightTree}
              source={{ uri: profileImage }}
              resizeMode='contain'
            />
          </ImageContainer>
          {frame && <ProfileImage style={{ position: 'absolute' }} width={width}
            height={height ? height : 170}
            source={frame}
            resizeMode='stretch' />}
        </TreeContainer>
      </View>
    );
  }
}

TreeScreenShot.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  style: PropTypes.object,
  treeBackground: PropTypes.any,
  profileImage: PropTypes.string,
};
