import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { View, Image, ScrollView, StyleSheet } from 'react-native';
import { ScreenOrientation } from 'expo';
import Navbar from '../../commons/components/Navbar/Navbar';
import MoiBackground from '../../commons/components/Background/MoiBackground';
import TreeBottom from './components/TreeBottom';
import { Maceta } from '../../commons/components/SceneComponents';
import treeStaticImage from '../../../assets/images/tree/static_tree.png';

const styles = StyleSheet.create({
  treeView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    position: 'relative',
    zIndex: 1,
  },
});

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
`;

export default class Tree extends Component {
  componentDidMount() {
    ScreenOrientation.allow('ALL');
  }

  render() {
    return (
      <MoiBackground>
        <ScrollView
          contentContainerStyle={styles.treeView}
          maximumZoomScale={3}
          minimumZoomScale={1}>
          <MacetaContainer><Maceta width={200}/></MacetaContainer>
          <TreeImage
            width={300}
            source={treeStaticImage}
            resizeMode='contain' />
        </ScrollView>
        <Navbar/>
        <TreeBottom />
      </MoiBackground>
    );
  }
}

Tree.propTypes = {
  title: PropTypes.string,
};
