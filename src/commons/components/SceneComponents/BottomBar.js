import React, { Component } from 'react';
import { Image } from 'react-native';
import { connect } from 'react-redux';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';

import { LANDSCAPE } from '../../../constants';
import footerBar from '../../../../assets/images/bottomBar/bottom_bar.png';
import footerBarLandscape from '../../../../assets/images/bottomBar/bottom_bar_landscape.png';

const Bar = styled(Image)`
  height: 20;
  width: ${props => props.width};
`;

@connect(store => ({ device: store.device }))
export default class BottomBar extends Component {
  static propTypes = {
    device: PropTypes.object,
  }

  render() {
    const { device } = this.props;
    const { width, orientation } = device.dimensions;
    const currentImage = orientation === LANDSCAPE ? footerBarLandscape : footerBar;
    return (<Bar width={width} source={currentImage} resizeMode='contain' />);
  }
}
