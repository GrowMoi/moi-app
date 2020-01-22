import React from 'react';
import { View, Animated, Easing, Button, ImageBackground } from 'react-native';
import LottieView from 'lottie-react-native'
import moi_articulation from '../../../assets/animations/moi-articulation.json';

class Test extends React.Component {
  state = {
    buttonAppear: false,
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
         <LottieView
            ref={ref => { this.anim = ref }}
            source={moi_articulation}
            resizeMode='contain'
            progress={this.state.progress}
            loop
            style={{
              flex: 1,
              position: 'absolute',
              width: '100%',
              height: '100%',
              transform: [{scale: 1.3}]
            }}
          />
      </View>
    );
  }
}

export default Test;
