import React, { Component } from 'react';
import { View, Modal } from 'react-native';
import { Video as ExpoVideo } from 'expo';
import Ionicons from '@expo/vector-icons/Ionicons';
import styled from 'styled-components/native';
import { getHeightAspectRatio } from '../../utils';
import { Palette } from '../../styles';
import { Sound } from '../SoundPlayer';

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

class Video extends Component {

  componentWillUpdate(nextProps) {
    const { visible } = nextProps;
    Sound.pause();
    return true;
  }

  render() {
    const { source, animationType , visible , dismiss, videoDimensions, width, modalProps, videoProps } = this.props;

    return (
          <Modal {...modalProps}
            animationType={animationType}
            visible={visible}
            supportedOrientations={['portrait', 'landscape']}
          >
            <Overlay>
              <CloseIcon
                name='md-close'
                color='white'
                size={35}
                onPress={dismiss}
              />
              <ExpoVideo
                {...videoProps}
                source={source}
                rate={1.0}
                volume={1.0}
                isMuted={false}
                resizeMode={ExpoVideo.RESIZE_MODE_STRETCH}
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
}

export default Video;