import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { View, ImageBackground } from 'react-native';
import { Size, Palette } from '../../styles';
import { getHeightAspectRatio } from '../../utils';

import regular_box from '../../../../assets/images/background/regular_box.png';
import yellow_box from '../../../../assets/images/background/amarillo_box.png';
import orange_box from '../../../../assets/images/background/naranja_box.png';
import fushia_box from '../../../../assets/images/background/fuccia_box.png';
import blue_box from '../../../../assets/images/background/azul_box.png';
import lila_box from '../../../../assets/images/background/lila_box.png';
import green_box from '../../../../assets/images/background/verde_box.png';

const Container = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
`

const width = 622;
const height = 991;
const ContentScreen = styled(ImageBackground)`
  flex: 1;
  width: ${props => props.width};
  height: ${props => getHeightAspectRatio(width, height, props.width)};
  justify-content: center;
  border-radius: 10;
  margin-top: ${Size.navbarHeight + Size.spaceXSmall};
  justify-content: flex-start;
  align-items: center;
  padding-bottom: 50;
  padding-top: 30;
  padding-left: 20;
  padding-right: 10;
`;

@connect(store => ({
  achievements: store.user.achievements,
  device: store.device,
}))
export default class ContentBox extends Component {
  get currentAchievement() {
    const { achievements } = this.props;

    const [achievement] = (achievements || []).filter(item => item.active);
    return achievement;
  }

  getCurrentBox() {
     let currentBox = regular_box;
    const currentAchievement = (this.currentAchievement || {}).number;
    if(currentAchievement === 2) currentBox = yellow_box;
    else if(currentAchievement === 3) currentBox = fushia_box;
    else if(currentAchievement === 4) currentBox = blue_box;
    else if(currentAchievement === 5) currentBox = green_box;
    else if(currentAchievement === 8) currentBox = lila_box;

    return currentBox;
  }

  render() {
    const { device: { dimensions: { width } }, image } = this.props;
    const {
      contentContainerStyle,
      style,
      ...rest
    } = this.props;

    const padding = 20;
    return (
      <Container>
        <ContentScreen
          style={style}
          resizeMode='stretch'
          width={(width - padding)}
          source={image ? image : this.getCurrentBox()}
          {...rest}>
          {this.props.children}
        </ContentScreen>
      </Container>
    );
  }
}

ContentBox.propTypes = {
  children: PropTypes.any,
  contentContainerStyle: PropTypes.any,
  style: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]),
};
