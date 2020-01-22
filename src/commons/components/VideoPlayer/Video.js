import React, { Component } from 'react';
import { View, Modal, Platform } from 'react-native';
import { ScreenOrientation } from 'expo';
import { Video as ExpoVideo } from 'expo-av';
import Ionicons from '@expo/vector-icons/Ionicons';
import styled from 'styled-components/native';
import Orientation from 'react-native-orientation';
import { getHeightAspectRatio } from '../../utils';
import { Palette } from '../../styles';
import Sound from '../SoundPlayer/Sound';
import Button from '../Buttons/Button';
import MoiModal from '../../../containers/Modal/MoiModal';

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

  componentWillMount() {
    this.currentOrientation = Orientation.getInitialOrientation();
    Orientation.lockToLandscape();
  }

  componentDidMount() {
    Sound.pause();
  }

  componentWillUnmount() {
    Sound.play();

    if(this.currentOrientation === 'PORTRAIT') {
      Orientation.lockToPortrait();
    }
  }

  onDismiss = () => {
    const { dismiss, onPlaybackStatusUpdate} = this.props;
    if(dismiss) dismiss();
    if(onPlaybackStatusUpdate) onPlaybackStatusUpdate({didJustFinish: true});
  }

  render() {
    const { source, animationType , visible , dismiss, videoDimensions, width, modalProps, videoProps, onPlaybackStatusUpdate, showCloseIcon, skipButton } = this.props;

    return (
          <MoiModal {...modalProps}
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
                resizeMode={ExpoVideo.RESIZE_MODE_CONTAIN}
                onPlaybackStatusUpdate={onPlaybackStatusUpdate}
                // isPortrait={false}
                // switchToLandscape={() => ScreenOrientation.allow(ScreenOrientation.Orientation.LANDSCAPE)}
                shouldPlay
                style={{
                  width,
                  height: !!videoDimensions ? getHeightAspectRatio(videoDimensions.width, videoDimensions.height, width) : '',
                }}
              />
              {skipButton && <Button
                title={'Saltar'}
                onPress={this.onDismiss}
                style={{
                  position: 'absolute',
                  bottom: 5,
                  right: 10,
                  backgroundColor: '#E8C37C',
                  borderWidth: 0,
                  borderRadius: 10
                }}
               />}
            </Overlay>
          </MoiModal>
        );
  }

}

Video.defaultProps = {
  animationType: 'fade',
  visible: false,
  showCloseIcon: true,
}

export default Video;
