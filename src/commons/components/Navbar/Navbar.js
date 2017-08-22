import React, { Component } from 'react';
import { Image, Dimensions, StatusBar, View } from 'react-native';
import { ScreenOrientation } from 'expo';
import styled from 'styled-components/native';
import tabbarImage from '../../../../assets/images/navbar/barra_sup_horizontal.png';
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
  }

  componentWillMount() {
    ScreenOrientation.allow('ALL');
    Dimensions.addEventListener('change', this.currentDimensions);
  }

  currentDimensions = () => {
    const { width } = Dimensions.get('screen');
    this.setState({ currentWidth: width });
  }

  render() {
    const { currentWidth } = this.state;
    return (
      <Bar>
        <StatusBar hidden />
        <BackgroundImage
          resizeMode='cover'
          width={currentWidth}
          source={tabbarImage}
        />
      </Bar>
    );
  }
}
