import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ImageBackground, Image } from 'react-native';
import styled from 'styled-components/native';
import { getHeightAspectRatio } from '../../utils';
import AnimatedTree from './AminatedTree';
// import loadingGif from './assets/images/spiner-moi.gif';

const width = 873;
const height = 1146;


const Background = styled(ImageBackground)`
  width: 100%;
  height: 100%;
  padding: 20px;
  align-self: stretch;
  align-items: center;
  justify-content: center;
  flex: 1;
`;

const Tree = styled(Image)`
  width: 320;
  height: ${getHeightAspectRatio(width, height, 320)};
  position: absolute;
  top: 60;
`;

const Spinner = styled(Image)`
  width: 100;
  height: 100;
  position: absolute;
  bottom: 30;
`;

export default class Loader extends Component {

  render() {

    return (
      <Background source={{uri: 'splash'}} resizeMode='stretch'>
        {/* <Tree source={{ uri: 'tree_splash' }} width={500} height={500}/> */}
        <AnimatedTree/>

        <Spinner source={require('../../../../assets/images/spiner-moi.gif')} resizeMode="cover"/>
      </Background>
    );
  }
}

// ContentListScene.propTypes = {
//   title: PropTypes.string,
//   neuronSelected: PropTypes.object,
//   neuron_id: PropTypes.number,
//   device: PropTypes.object,
// };
