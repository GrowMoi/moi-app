import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, ImageBackground, Image } from 'react-native';
import styled, { css } from 'styled-components/native';
import deviceUtils from '../../utils/device-utils'

const TreeContainer = styled(ImageBackground)`
  justify-content: center;
  align-items: center;
  width: auto;
  height: auto;
`;

const ImageContainer = styled(View)`
  ${(props) => !!props.width && css`
    width: ${props.width};
  `}
  ${props => !!props.height && css`
    height: ${props.height};
  `}
  justify-content: center;
  align-items: center;
  z-index: 0;
`;

const ProfileImage = styled(Image)`
  width: ${props => props.width};
  height: ${props => props.height};
`;

class TreeScreenShot extends Component {
  state = {
    imageWidth: 375,
    imageHeight: 667,
  }

  componentWillMount() {
    const { profileImage } = this.props;
    if (!profileImage) return;
    Image.getSize(profileImage, (width, height) => this.setState({ imageWidth: width, imageHeight: height }));
  }

  calculateImageWidth(width, height, containerHeight) {
    const percentageSize = (containerHeight * 100) / height;
    return width * (percentageSize / 100);
  }

  render() {
    const { width, height, profileImage, treeBackground, style, frame } = this.props;

    const heightTree = height ? frame ? height - 50 : height - 80 : 180;
    const treeImage = profileImage ? { uri: profileImage } : { uri: 'tree_default' };

    const heightFrame = height ? height : 170;

    return (
      <View style={style}>
        <TreeContainer width={width}
          source={{ uri: treeBackground }}
          resizeMode='stretch'
        >
          <ImageContainer
            width={width + 30}
            height={heightTree}>
            <Image
              style={{
                height: '80%',
                width: '80%',
                position: 'absolute',
                bottom: frame && deviceUtils.isTablet() ? 20 : 0,
              }}
              source={treeImage}
              resizeMode='contain'
            />
          </ImageContainer>
          {frame &&
          <View style={{position: 'absolute', height: heightFrame + 30, paddingTop: 30}}>
            <ProfileImage width={width}
                height={heightFrame}
                source={{ uri: frame }}
                resizeMode='stretch' />
            </View>
            }
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

const mapStateToProps = (state) => ({
  device: state.device,
})

export default connect(mapStateToProps)(TreeScreenShot)

