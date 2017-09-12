import React, { Component } from 'react';
import styled from 'styled-components/native';
import { Entypo } from '@expo/vector-icons';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import Swiper from 'react-native-swiper';
import ContentImage from './ContentImage';
import { Palette } from '../../styles';
import { colors } from '../../styles/palette';

const ContainerSwiper = styled(View)`
  width: ${props => props.size.width};
  height: ${props => props.size.height};
  background-color: ${Palette.primary};
`;

export default class Carousel extends Component {
  render() {
    const {
      size,
      images,
      ...rest
    } = this.props;

    return (
      <ContainerSwiper size={size}>
        <Swiper
          {...rest}
          nextButton={<Entypo name='chevron-right' size={35} color={colors.lightGray.css()} />}
          prevButton={<Entypo name='chevron-left' size={35} color={colors.lightGray.css()} />}
        >
          {images.length > 0 && images.map((image, i) => (
            <ContentImage
              key={i}
              size={size}
              source={{ uri: image }}
            />
          ))}
        </Swiper>
      </ContainerSwiper>
    );
  }
}


Carousel.defaultProps = {
  size: {
    width: 200,
    height: 200,
  },
  images: [],
};


Carousel.propTypes = {
  size: PropTypes.any,
  images: PropTypes.array,
};
