import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components/native';
import { Entypo } from '@expo/vector-icons';
import { View, ActivityIndicator, Image } from 'react-native';
import ViewTransformer from 'react-native-view-transformer-next';
import Ionicons from '@expo/vector-icons/Ionicons';
import PropTypes from 'prop-types';
import uuid from 'uuid/v4'
import Swiper from 'react-native-swiper';
import { Video } from 'expo-av';
import SimpleVideoPlayer from '../../components/SimpleVideoPlayer/VideoPlayer';
import ContentImage from './ContentImage';
import MoiModal from '../../../containers/Modal/MoiModal';
import { Palette, Size } from '../../styles';
import { colors } from '../../styles/palette';
import moiVideos from '../../../../assets/videos';

// Actions
import neuronActions from '../../../actions/neuronActions';

const ContainerSwiper = styled(View)`
  width: ${props => props.size.width};
  height: ${props => props.size.height};
  background-color: ${Palette.colors.blue};
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
    videoId: '',
  }

  openImage = ({attrs, item = {} }) => {
    const { type, videoId } = item;
    this.setState({ fullScreenImage: true, expandedImage: attrs, type, videoId });
  }

  dismiss = () => {
    this.setState({ fullScreenImage: false, expandedImage: {}, type: '', videoId: '' });
  }

  getVideoId(url){
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match&&match[7].length==11)? match[7] : false;
  }

  render() {
    const {
      size,
      images,
      videos,
      ...rest
    } = this.props;

    const { fullScreenImage, expandedImage, type, videoId } = this.state;

    const imagesFormatted = (images || []).map(imageUrl => ({
      imageUrl,
      type: 'image',
    }))

    const videosFormatted = (videos || []).map(video => ({
      imageUrl: video.thumbnail.startsWith('//') ? `https:${video.thumbnail}` : video.thumbnail,
      videoId: this.getVideoId(video.url) || '',
      type: 'video',
    }));

    const media = imagesFormatted.concat(videosFormatted);

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
              onPressImage={(attrs) => this.openImage({ attrs, item: d })}
              size={size}
              data={d}
              source={{ uri: d.imageUrl }}
            />
          })}
        </Swiper>

        <MoiModal
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
            {type === 'video' &&
              <SimpleVideoPlayer
                resizeMode={Video.RESIZE_MODE_CONTAIN}
                source={moiVideos[videoId]}
                inFullscreen={true}
                showFullscreenButton={false}
              />
            }
          </Overlay>
        </MoiModal>
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
  videos: [],
};


Carousel.propTypes = {
  size: PropTypes.any,
  images: PropTypes.array,
  images: PropTypes.array,
};
