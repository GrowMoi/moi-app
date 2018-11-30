import React, { Component } from 'react';
import styled from 'styled-components/native';
import { Entypo } from '@expo/vector-icons';
import Modal from 'expo/src/modal/Modal';
import { View, ActivityIndicator, Image, WebView } from 'react-native';
import ViewTransformer from 'react-native-view-transformer-next';
import Ionicons from '@expo/vector-icons/Ionicons';
import PropTypes from 'prop-types';
import Swiper from 'react-native-swiper';
import ContentImage from './ContentImage';
import { Palette, Size } from '../../styles';
import { colors } from '../../styles/palette';
import { youtube } from '../../../commons/utils'

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

const VideoContainer = styled(View)`
  flex: 1;
  flex-flow: row wrap;
  justify-content: space-around;
  margin-vertical: ${Size.spaceSmall};
`;

export default class Carousel extends Component {
  state = {
    fullScreenImage: false,
    expandedImage: {},
  }

  openImage = attrs => {
    this.setState({ fullScreenImage: true, expandedImage: attrs });
  }

  dismiss = () => {
    this.setState({ fullScreenImage: false, expandedImage: {} });
  }

  render() {
    const {
      size,
      images,
      videos,
      ...rest
    } = this.props;

    const { fullScreenImage, expandedImage } = this.state;
    const videosFormatted = (videos || []).map(video => ({
      thumbnail: video.thumbnail || '',
      url: video.url || '',
      type: 'video',
    }))

    const imagesFormatted = (images || []).map(imageUrl => ({
      url: imageUrl,
      type: 'image',
    }))


    const media = [...videosFormatted, ...imagesFormatted];

    console.log('MEDIA', media);

    return (
      <ContainerSwiper size={size}>
        <Swiper
          {...rest}
          loadMinimalLoader={<ActivityIndicator />}
          nextButton={<Entypo name='chevron-right' size={35} color={colors.lightGray.css()} />}
          prevButton={<Entypo name='chevron-left' size={35} color={colors.lightGray.css()} />}
        >
          {(videos || []).length > 0 &&
            (videos || []).map((video, i) => {
              const videoId = youtube.extractIdFromUrl(video.url);
              const videoUrl = 'https://www.youtube.com/embed/' + videoId + '?rel=0&autoplay=0&showinfo=0&controls=0';
              if (videoId) {
                return (
                  <WebView
                    key={`${videoId}`}
                    style={{ flex: 1, height: 300, width: 300}}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    source={{uri: videoUrl }}
                  />
                  );
                }
              })
            }
          {images.length > 0 && images.map((image, i) => (
            <ContentImage
              key={i}
              onPressImage={this.openImage}
              size={size}
              source={{ uri: image }}
            />
          ))}
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
            <Zoom maxScale={4}>
              <Image
                source={{...expandedImage.source}}
                resizeMode='contain'
                style={{ width: '100%', height: '100%' }}
              />
            </Zoom>
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
