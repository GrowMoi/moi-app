import React, { PureComponent } from 'react';
import { Video } from 'expo-av';
import VideoPlayer from 'expo-video-player'
// import { Dimensions } from 'react-native'
import Sound from '../SoundPlayer/Sound';
// import { getHeightAspectRatio } from '../../utils';


// const VIDEO_WIDTH = 640
// const VIDEO_HEIGHT = 360
// const width = Dimensions.get('window').width
// const height = getHeightAspectRatio(VIDEO_WIDTH, VIDEO_HEIGHT, width)

class SimpleVideoPlayer extends PureComponent {
  componentDidMount() {
    Sound.pause();
  }

  componentWillUnmount() {
    Sound.play();
  }

  render() {
    const { source, resizeMode, inFullscreen, showFullscreenButton } = this.props;
    return (
      <VideoPlayer
        videoProps={{
          shouldPlay: true,
          resizeMode,
          source,
        }}
        inFullscreen={inFullscreen}
        showFullscreenButton={showFullscreenButton}
      />
    );
  }
}

SimpleVideoPlayer.defaultProps = {
  resizeMode: Video.RESIZE_MODE_CONTAIN,
  inFullscreen: true,
  showFullscreenButton: false
}

export default SimpleVideoPlayer;