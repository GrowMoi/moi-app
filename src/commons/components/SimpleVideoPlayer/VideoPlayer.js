import React, { Component } from 'react';
import { Video } from 'expo-av';
import VideoPlayer from 'expo-video-player'
import Sound from '../SoundPlayer/Sound';

class SimpleVideoPlayer extends Component {

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
