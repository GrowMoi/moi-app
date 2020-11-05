import React, { useEffect, useState, useRef } from 'react';
import { Video } from 'expo-av';
import { Dimensions, ActivityIndicator, View } from 'react-native'
import Sound from '../SoundPlayer/Sound';
import { getHeightAspectRatio } from '../../utils';

const VIDEO_WIDTH = 640
const VIDEO_HEIGHT = 360
const width = Dimensions.get('window').width
const height = getHeightAspectRatio(VIDEO_WIDTH, VIDEO_HEIGHT, width)

const SimpleVideoPlayer = (props) => {
  const video = useRef(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    Sound.pause();
    return () => {
      Sound.play();
    }
  }, [])

  return (
    <>
      {loading && (
        <View style={{ height: height, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator size="large"/>
        </View>
      )}
      <Video
        ref={video}
        source={{ uri: props.source }}
        rate={1.0}
        volume={1.0}
        onPlaybackStatusUpdate={(playBack) => {
          if(playBack.didJustFinish) {
            if(props.onVideoFinished()) {
              props.onVideoFinished();
            }
          }
        }}
        isMuted={false}
        resizeMode={props.resizeMode}
        shouldPlay
        isLooping={false}
        onLoadStart={() => { setLoading(true); }}
        onLoad={() => { setLoading(false); }}
        useNativeControls
        style={{ width: width, height: loading ? 0 : height }}
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