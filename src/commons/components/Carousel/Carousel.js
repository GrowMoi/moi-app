import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components/native';
import { Entypo } from '@expo/vector-icons';
import Modal from 'expo/src/modal/Modal';
import { View, ActivityIndicator, Image, WebView } from 'react-native';
import ViewTransformer from 'react-native-view-transformer-next';
import Ionicons from '@expo/vector-icons/Ionicons';
import PropTypes from 'prop-types';
import uuid from 'uuid/v4'
import Swiper from 'react-native-swiper';
import ContentImage from './ContentImage';
import { Palette, Size } from '../../styles';
import { colors } from '../../styles/palette';

// Actions
import neuronActions from '../../../actions/neuronActions';

const ContainerSwiper = styled(View)`
  width: ${props => props.size.width};
  height: ${props => props.size.height};
  background-color: ${Palette.primary};
`;

const Overlay = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${Palette.black.alpha(0.7).css()};
`;

const CloseIcon = styled(Ionicons)`
  position: absolute;
  top: 20;
  right: 20;
  zIndex: 1;
  background-color: transparent;
`;

const Zoom = styled(ViewTransformer)`
  overflow: visible;
  position: relative;
  height: 50%;
  width: 100%;
`;

export default class Carousel extends Component {
  state = {
    fullScreenImage: false,
    expandedImage: {},
    type: '',
  }

  openImage = ({attrs, type}) => {
    this.setState({ fullScreenImage: true, expandedImage: attrs, type });
  }

  dismiss = () => {
    this.setState({ fullScreenImage: false, expandedImage: {}, type: '' });
  }

  render() {
    const {
      size,
      images,
      ...rest
    } = this.props;

    const { fullScreenImage, expandedImage, type } = this.state;

    const imagesFormatted = (images || []).map(imageUrl => ({
      url: imageUrl,
      type: 'image',
    }))

    return (
      <ContainerSwiper size={size}>
        <Swiper
          {...rest}
          loadMinimalLoader={<ActivityIndicator />}
          nextButton={<Entypo name='chevron-right' size={35} color={colors.lightGray.css()} />}
          prevButton={<Entypo name='chevron-left' size={35} color={colors.lightGray.css()} />}
        >
          {(imagesFormatted || []).map(d => {
            return <ContentImage
              key={uuid()}
              onPressImage={(attrs) => this.openImage({ attrs, type: d.type })}
              size={size}
              data={d}
              source={{ uri: d.url }}
            />
          })}
        </Swiper>

        <Modal
          visible={fullScreenImage}
          animationType='fade'
          transparent
          supportedOrientations={['portrait']}
        >
           <Overlay>
            <CloseIcon
              name='md-close'
              color='white'
              size={35}
              onPress={this.dismiss}
            />
            {type === 'image' && <Zoom maxScale={4}>
              <Image
                source={{...expandedImage.source}}
                resizeMode='contain'
                style={{ width: '100%', height: '100%' }}
              />
            </Zoom>}
          </Overlay>
        </Modal>
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
