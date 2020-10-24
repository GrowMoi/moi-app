import React, { useEffect, useState } from 'react';
import { Video } from 'expo-av';
import { Dimensions, ActivityIndicator } from 'react-native'
import Sound from '../SoundPlayer/Sound';
import { getHeightAspectRatio } from '../../utils';

const VIDEO_WIDTH = 640
const VIDEO_HEIGHT = 360
const width = Dimensions.get('window').width
const height = getHeightAspectRatio(VIDEO_WIDTH, VIDEO_HEIGHT, width)

const SimpleVideoPlayer = (props) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    Sound.pause();
    return () => {
      Sound.play();
    }
  }, [])


  return (
    <>
      {loading && (<ActivityIndicator size="large"/> )}
      <Video
        source={{ uri: props.source }}
        rate={1.0}
        volume={1.0}
        isMuted={false}
        resizeMode={props.resizeMode}
        shouldPlay
        isLooping
        onLoadStart={() => { setLoading(true); }}
        onLoad={() => { setLoading(false); }}
        useNativeControls
        style={{ width: width, height: height }}
      />
    </>
  )

}

SimpleVideoPlayer.defaultProps = {
  resizeMode: Video.RESIZE_MODE_CONTAIN,
  inFullscreen: true,
  showFullscreenButton: false
}

export default SimpleVideoPlayer;