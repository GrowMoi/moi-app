import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Image, StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import { connect } from 'react-redux';
import ViewTransformer from 'react-native-view-transformer';
import { Maceta } from '../SceneComponents';

import Level1 from './Level1';

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

@connect(store => ({
  device: store.device,
}))
export default class Tree extends Component {
  get level() {
    const level = 1;

    switch (level) {
      case 1:
        return {
          component: <Level1 />,
          zoomScale: 1,
        };
      case 9:
        return { component: <Level1 />, zoomScale: 1 };
      default:
        return { component: <Level1 />, zoomScale: 1 };
    }
  }

  render() {
    return (
      <TreeContainer>
        <ViewTransformer
          style={styles.treeView}
          maxScale={this.level.zoomScale}
        >
          <MacetaContainer><Maceta width={200}/></MacetaContainer>
          {this.level.component}
        </ViewTransformer>
      </TreeContainer>
    );
  }
}

Tree.propTypes = {
  device: PropTypes.any,
};
