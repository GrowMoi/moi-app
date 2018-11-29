import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Modal } from 'react-native';
import { Video as ExpoVideo, ScreenOrientation } from 'expo';
import Ionicons from '@expo/vector-icons/Ionicons';
import styled from 'styled-components/native';
import { getHeightAspectRatio } from '../../utils';
import { Palette } from '../../styles';

// Actions
import neuronActions from '../../../actions/neuronActions';

const Overlay = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${Palette.black};
`;

const CloseIcon = styled(Ionicons)`
  position: absolute;
  top: 20;
  right: 20;
  zIndex: 1;
  background-color: transparent;
`;

@connect(store => ({}),
{
  stopCurrentBackgroundAudio: neuronActions.stopCurrentBackgroundAudio,
  playCurrentBackgroundAudio: neuronActions.playCurrentBackgroundAudio,
})
class Video extends Component {

  componentWillUpdate(nextProps) {
    const { visible, stopCurrentBackgroundAudio, playCurrentBackgroundAudio } = this.props;

    if(!visible && nextProps.visible) {
        stopCurrentBackgroundAudio();
    } else if(visible && !nextProps.visible) {
        playCurrentBackgroundAudio();
    }

    return true;
  }

  render() {
    const { source, animationType , visible , dismiss, videoDimensions, width, modalProps, videoProps, onPlaybackStatusUpdate, showCloseIcon } = this.props;

    return (
          <Modal {...modalProps}
            animationType={animationType}
            visible={visible}
            supportedOrientations={['landscape']}
          >
            <Overlay>
              {showCloseIcon && <CloseIcon
                name='md-close'
                color='white'
                size={35}
                onPress={dismiss}
              />}
              <ExpoVideo
                {...videoProps}
                source={source}
                rate={1.0}
                volume={1.0}
                isMuted={false}
                isPortrait={false}
                resizeMode={ExpoVideo.RESIZE_MODE_CONTAIN}
                onPlaybackStatusUpdate={onPlaybackStatusUpdate}
                switchToLandscape={()=>ScreenOrientation.allow(ScreenOrientation.Orientation.LANDSCAPE)}
                shouldPlay
                style={{
                  width,
                  height: !!videoDimensions ? getHeightAspectRatio(videoDimensions.width, videoDimensions.height, width) : '',
                }}
              />
            </Overlay>
          </Modal>
        );
  }

}

Video.defaultProps = {
  animationType: 'fade',
  visible: false,
  showCloseIcon: true,
}

export default Video;
