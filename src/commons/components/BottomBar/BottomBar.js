import React, { Component } from 'react';
import { Image, Dimensions } from 'react-native';
import styled from 'styled-components/native';
import footerBar from '../../../../assets/images/bottomBar/bottom_bar.png';
import footerBarLandscape from '../../../../assets/images/bottomBar/bottom_bar_landscape.png';

const initialState = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
};

const initialOrientation = initialState.width >= initialState.height ? 'LANDSCAPE' : 'PORTRAIT';
const Bar = styled(Image)`
  position: absolute;
  bottom: 0;
  height: 15;
  left: 0;
  right: 0;
  width: ${props => props.width};
`;

export default class BottomBar extends Component {
  state = {
    orientation: initialOrientation,
  }

  componentDidMount() {
    Dimensions.addEventListener('change', this.changePosition);
  }

  componentWillUnmount() {
    Dimensions.removeEventListener('change', this.changePosition);
  }

  changePosition = () => {
    const { width, height } = Dimensions.get('window');
    this.setState({ orientation: width >= height ? 'LANDSCAPE' : 'PORTRAIT' });
  }

  render() {
    const { orientation } = this.state;
    const { width } = Dimensions.get('window');
    const currentImage = orientation === 'PORTRAIT' ? footerBar : footerBarLandscape;
    return (
      <Bar width={width} source={currentImage} resizeMode='cover' />
    );
  }
}
