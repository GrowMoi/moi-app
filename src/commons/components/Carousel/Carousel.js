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
import { youtube } from '../../../commons/utils';

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

const VideoContainer = styled(View)`
  flex: 1;
  flex-flow: row wrap;
  justify-content: space-around;
  margin-vertical: ${Size.spaceSmall};
`;

const makeHTLM = (url = '') => {
  const id = youtube.extractIdFromUrl(url);

  return (`
    <style>
      .video {
        position: relative;
        padding-bottom: 56.25%;
      }
      iframe {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        width: 100%;
        height: 100%;
      }
    </style>
    <div class='video'>
      <iframe width="560" height="315" src="https://www.youtube.com/embed/${id}?autoplay=1" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
    </div>
  `);
}

const Video = styled(View)`
  height: 220;
  width: 100%;
`;

@connect(store => ({}),
{
  stopCurrentBackgroundAudio: neuronActions.stopCurrentBackgroundAudio,
  playCurrentBackgroundAudio: neuronActions.playCurrentBackgroundAudio,
})
export default class Carousel extends Component {
  state = {
    fullScreenImage: false,
    expandedImage: {},
    type: '',
  }

  openImage = ({attrs, type}) => {
    const { stopCurrentBackgroundAudio } = this.props;
    if(type === 'video') {
      stopCurrentBackgroundAudio();
    }
    this.setState({ fullScreenImage: true, expandedImage: attrs, type });
  }

  dismiss = () => {
    const { playCurrentBackgroundAudio } = this.props;
    if(this.state.type === 'video') {
      playCurrentBackgroundAudio();
    }
    this.setState({ fullScreenImage: false, expandedImage: {}, type: '' });
  }

  render() {
    const {
      size,
      images,
      videos,
      ...rest
    } = this.props;

    const { fullScreenImage, expandedImage, type } = this.state;
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

    return (
      <ContainerSwiper size={size}>
        <Swiper
          {...rest}
          loadMinimalLoader={<ActivityIndicator />}
          nextButton={<Entypo name='chevron-right' size={35} color={colors.lightGray.css()} />}
          prevButton={<Entypo name='chevron-left' size={35} color={colors.lightGray.css()} />}
        >
          {(media || []).map(d => {
            return <ContentImage
              key={uuid()}
              onPressImage={(attrs) => this.openImage({ attrs, type: d.type })}
              size={size}
              data={d}
              source={{ uri: d.type === 'video' ? `https:${d.thumbnail}` : d.url }}
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
            {type === 'video' && (
              <Video>
                <WebView
                  scrollEnabled={false}
                  style={{ backgroundColor: 'transparent' }}
                  source={{ html: makeHTLM(expandedImage.data.url) }}
                />
              </Video>
            )}
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
