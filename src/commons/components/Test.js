import React from 'react';
import LottieView from 'lottie-react-native';
import { View, Animated, Easing } from 'react-native';
import animation from '../../../assets/images/content_box/mughead.json';

class Test extends React.Component {
  state = {
    progress: new Animated.Value(0),
  }
  componentDidMount() {
    Animated.timing(this.state.progress, {
      toValue: 1,
      duration: 5000,
      easing: Easing.linear,
    }).start();
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <LottieView
          ref={ref => { this.anim = ref }}
          source={require('../../../assets/images/content_box/ohter.json')}
          autoPlay
          resizeMode='cover'
          progress={this.state.progress}
          loop
        />
      </View>
    );
  }
}

export default Test;
