import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  View,
  PixelRatio,
  Modal,
  TouchableOpacity,
} from 'react-native';
import YouTube from 'react-native-youtube';
import { Ionicons } from '@expo/vector-icons';
import { Palette } from '../../styles';

const styles = StyleSheet.create({
  container: {
    backgroundColor: Palette.black,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  player: {
    alignSelf: 'stretch',
    marginVertical: 10,
  },

  closeIcon: {
    position: 'absolute',
    top: 15,
    right: 15,
  },
});


export default class YoutubePlayer extends Component {
  state = {
    isReady: false,
    status: null,
    quality: null,
    error: null,
    isPlaying: true,
    fullscreen: true,
    containerWidth: null,
  };

  onPressModal = () => {
    const { onPressClose } = this.props;
    if (onPressClose) onPressClose();
  }

  render() {
    const {
      visible,
      videoId,
    } = this.props;
    return (
      <Modal
        animationType="fade"
        visible={visible}
        {...this.props}
      >
        <View
          style={styles.container}
          onLayout={({ nativeEvent: { layout: { width } } }) => {
            if (this.state.containerWidth !== width) this.setState({ containerWidth: width });
          }}
        >
          <YouTube
            apiKey="AIzaSyCy6dfNaMK0jl7D9k0b6BuXFiXsPoKzvjo"
            videoId={videoId}
            play={this.state.isPlaying}
            loop={this.state.isLooping}
            fullscreen={this.state.fullscreen}
            controls={1}
            style={[
              { height: PixelRatio.roundToNearestPixel(this.state.containerWidth / (16 / 9)) },
              styles.player,
            ]}
            onError={e => this.setState({ error: e.error })}
            onReady={e => this.setState({ isReady: true })}
            onChangeState={e => this.setState({ status: e.state })}
            onChangeQuality={e => this.setState({ quality: e.quality })}
          />

          <TouchableOpacity style={styles.closeIcon} onPress={this.onPressModal}>
            <Ionicons name='ios-close-outline' color='white' size={40} />
          </TouchableOpacity>

        </View>
      </Modal>
    );
  }
}

YoutubePlayer.propTypes = {
  visible: PropTypes.bool,
  onPressClose: PropTypes.func,
  videoId: PropTypes.string,
};
