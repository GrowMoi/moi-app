import React from 'react';
import LottieView from 'lottie-react-native';
import { View, Animated, Easing } from 'react-native';

class ReadingAnimation extends React.Component {
  state = {
    progress: new Animated.Value(0),
  }

  play = () => {
    this.anim.play();
  }

  // componentDidMount() {
  //   Animated.timing(this.state.progress, {
  //     toValue: 1,
  //     duration: 2000,
  //     easing: Easing.linear,
  //   }).start();
  // }

  componentWillUnmount() {
    this.anim.reset();
  }

  render() {
    return (
      <View style={{ flex: 1, position: 'absolute', top: 0, right: 0, height: '100%', width: '100%' }}>
        <LottieView
          ref={ref => { this.anim = ref }}
          source={require('../../../../assets/animations/confusion.json')}
          resizeMode='cover'
          progress={this.state.progress}
          loop
          style={{
            height: '100%',
            width: '100%'
          }}
        />
      </View>
    );
  }
}

export default ReadingAnimation;
