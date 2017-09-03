import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Image, StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import { connect } from 'react-redux';
import ViewTransformer from 'react-native-view-transformer';
import { Maceta } from '../SceneComponents';

import staticTree from '../../../../assets/images/tree/static_tree.png';

const styles = StyleSheet.create({
  treeView: {
    position: 'relative',
    flex: 1,
  },
});

const TreeContainer = styled(View)`
  flex: 1;
  justify-content: flex-end;
`;

const MacetaContainer = styled(View)`
  position: absolute;
  align-items: center;
  left: 0;
  right: 0;
  bottom: 0;
`;

const treeImageAspectRatio = (4 / 5);
const TreeImage = styled(Image)`
  width: ${props => props.width || 250};
  height: ${props => treeImageAspectRatio * props.width};
  position: absolute;
  bottom: 50;
  align-self: center;
`;

@connect(store => ({
  device: store.device,
}))
export default class Tree extends Component {
  get levelImage() {
    const level = 9;
    switch (level) {
      case 1:
        return null;
      case 9:
        return staticTree;
      default:
        return null;
    }
  }

  render() {
    const { device } = this.props;
    const { width, height } = device.dimensions;
    return (
      <TreeContainer>
        <ViewTransformer
          style={styles.treeView}
          maxScale={9}
        >
          <MacetaContainer><Maceta width={200}/></MacetaContainer>
          <TreeImage
            width={300}
            source={staticTree}
            resizeMode='contain'
          />
        </ViewTransformer>
      </TreeContainer>
    );
  }
}

Tree.propTypes = {
  device: PropTypes.any,
};
