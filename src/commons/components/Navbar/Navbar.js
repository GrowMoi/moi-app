import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import { Image, Dimensions, StatusBar, View } from 'react-native';
import { ScreenOrientation } from 'expo';
import styled from 'styled-components/native';
import navbarImageLandscape from '../../../../assets/images/navbar/barra_sup_landscape.png';
import navbarImagePortrait from '../../../../assets/images/navbar/barra_superior_portrait.png';
import { Size } from '../../styles';

const Bar = styled(View)`
  position: absolute;
  left: 0;
  right: 0;
  top: -2;
  height: ${Size.navbarHeight};
`;

const BackgroundImage = styled(Image)`
  position: relative;
  flex: 1;
  width: ${props => props.width};
  height: ${Size.navbarHeight};
`;

export default class Navbar extends Component {
  width = Dimensions.get('screen').width
  state = {
    currentWidth: this.width,
    currentImage: navbarImagePortrait,
  }

  componentWillMount() {
    ScreenOrientation.allow('ALL');
    Dimensions.addEventListener('change', this.currentDimensions);
  }

  componentWillUnmount() {
    Dimensions.removeEventListener('change', this.currentDimensions);
  }

  currentDimensions = () => {
    const { width } = Dimensions.get('screen');
    this.setState({
      currentWidth: width,
    });
  }

  goToProfile = () => {
    Actions.profile();
  }

  render() {
    const { currentWidth } = this.state;
    const { width } = Dimensions.get('screen');

    const maxWidth = 500;
    const currentImage = width >= maxWidth ? navbarImageLandscape : navbarImagePortrait;

    return (
      <Bar>
        <StatusBar hidden />
        <BackgroundImage
          resizeMode='stretch'
          width={currentWidth}
          source={currentImage}
        />
      </Bar>
    );
  }
}

Navbar.propTypes = {
  title: PropTypes.string,
  rightButton: PropTypes.any,
  leftButton: PropTypes.any,
};
