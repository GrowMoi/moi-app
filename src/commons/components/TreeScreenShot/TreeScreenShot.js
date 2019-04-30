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
  padding: 10px;
`;

const ProfileImage = styled(Image)`
  width: ${props => getHeightAspectRatio(widthProfile, heightProfile, props.width)};
  height: ${props => props.height};
`;

export default class TreeScreenShot extends Component {

  render() {
    const { width, height, profileImage, treeBackground, style } = this.props;

    return (
      <View style={style}>
        <TreeContainer width={width}
          source={treeBackground}
          resizeMode='stretch'
        >
          <ProfileImage
            width={width}
            height={height ? height : 170}
            source={{ uri: profileImage }}
            resizeMode='contain'
          />
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
