import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { View, Image } from 'react-native';
import { ScreenOrientation } from 'expo';
import Navbar from '../../commons/components/Navbar/Navbar';
import MoiBackground from '../../commons/components/Background/MoiBackground';
import TreeBottom from './components/TreeBottom';
import treeStaticImage from '../../../assets/images/tree/static_tree.png';

const Content = styled(View)`
  flex: 1;
  justify-content: flex-end;
  align-items: center;
  position: relative;
  z-index: 1;
`;

const treeImageAspectRatio = (4 / 5);
const TreeImage = styled(Image)`
  width: ${props => props.width || 250};
  height: ${props => treeImageAspectRatio * props.width};
  bottom: 50;
`;

export default class Tree extends Component {
  componentDidMount() {
    ScreenOrientation.allow('ALL');
  }

  render() {
    return (
      <MoiBackground>
        <Navbar/>
        <Content>
          <TreeImage
            width={300}
            source={treeStaticImage}
            resizeMode='contain' />
        </Content>
        <TreeBottom />
      </MoiBackground>
    );
  }
}

Tree.propTypes = {
  title: PropTypes.string,
};
