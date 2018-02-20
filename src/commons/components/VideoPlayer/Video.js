import React from 'react';
import { View, Modal } from 'react-native';
import { Video as ExpoVideo } from 'expo';
import Ionicons from '@expo/vector-icons/Ionicons';
import styled from 'styled-components/native';
import { getHeightAspectRatio } from '../../utils';
import { Palette } from '../../styles';

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
`;


const Video = ({
  source,
  animationType ='fade',
  visible = false,
  dismiss,
  videoDimensions,
  width,
  ...modalProps,
  ...videoProps
}) => {

  return (
    <Modal {...modalProps}
      animationType={animationType}
      visible={visible}
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

export default Video;
