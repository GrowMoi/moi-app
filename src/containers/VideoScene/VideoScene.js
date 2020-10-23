import React, { PureComponent } from 'react'
import { View } from 'react-native'
import styled from 'styled-components/native'
import { connect } from 'react-redux'
import { Video } from 'expo-av'
import { Ionicons } from '@expo/vector-icons';
import { Actions } from 'react-native-router-flux'

import SimpleVideoPlayer from '../../commons/components/SimpleVideoPlayer/VideoPlayer'
import { Sound } from '../../commons/components/SoundPlayer'


const Container = styled(View)`
  width: 100%;
  height: 100%;
  flex: 1;
  position: absolute;
  top: 0;
  left: 0;
`;

const CloseIcon = styled(Ionicons)`
  position: absolute;
  top: 20;
  right: 20;
  zIndex: 1;
  background-color: transparent;
`;

class VideoScene extends PureComponent {
  componentDidMount(){
    Sound.pause()
  }

  componentWillUnmount() {
    Sound.play();
  }

  dismiss = () => {
    Actions.pop()
  }

  render() {
    const { sourceVideo } = this.props;

    return (
      <Container>
        <CloseIcon
          name='md-close'
          color='white'
          size={35}
          onPress={this.dismiss}
        />
        <SimpleVideoPlayer
          resizeMode={Video.RESIZE_MODE_CONTAIN}
          inFullscreen={true}
          source={sourceVideo}
          style={{ width: '100%', height: '100%' }}
          showFullscreenButton={false}
        />
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  showPassiveMessage: state.user.showPassiveMessage,
})

export default connect(mapStateToProps)(VideoScene)