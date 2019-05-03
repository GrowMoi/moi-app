import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, ImageBackground, Image } from 'react-native';
import styled from 'styled-components/native';
import treeDefault from '../../../../assets/images/sideMenu/tree_default.png';

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
  padding: 10px;
`;

const ProfileImage = styled(Image)`
  width: ${props => props.width};
  height: ${props => props.height};
`;

export default class TreeScreenShot extends Component {

  render() {
    const { width, height, profileImage, treeBackground, style, frame } = this.props;

    const heightTree = height ? frame ? height - 50 : height -80 : 180;
    const treeImage = profileImage ? { uri: profileImage } : treeDefault;

    return (
      <View style={style}>
        <TreeContainer width={width}
          source={treeBackground}
          resizeMode='stretch'
        >
          <ImageContainer width={width + 30}
            height={heightTree}>
            <Image
            style={{flex:1, height: undefined, width: undefined, marginBottom: -15}}
              source={treeImage}
              resizeMode='cover'
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
