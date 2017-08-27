import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Image, Dimensions } from 'react-native';
import styled from 'styled-components/native';
import backgroundPortrait from '../../../../assets/images/background/background_tree_portrait.jpg';
import backgroundLandscape from '../../../../assets/images/background/background_tree_landscape.jpg';

const Background = styled(Image)`
  width: ${props => props.width};
  height: ${props => props.height};
  flex: 1;
`;

export default class MoiBackground extends Component {
  maxWidth = 475
  state = {
    currentWidth: Dimensions.get('window').width,
  }

  componentDidMount() {
    Dimensions.addEventListener('change', this.changeDimension);
  }

  componentWillUnmount() {
    Dimensions.removeEventListener('change', this.changeDimension);
  }

  changeDimension = () => {
    const { width } = Dimensions.get('window');
    this.setState({ currentWidth: width });
  }

  render() {
    console.log('Render MOIBACKGROUND');
    const { width, height } = Dimensions.get('window');
    const { currentWidth } = this.state;
    const currentImage = currentWidth >= this.maxWidth ? backgroundLandscape : backgroundPortrait;
    return (
      <Background width={width} height={height} source={currentImage} resizeMode='cover'>
        {this.props.children}
      </Background>
    );
  }
}

MoiBackground.propTypes = {
  children: PropTypes.any,
};
