import React from 'react';
import LottieView from 'lottie-react-native';
import { View, Animated, Easing, Modal } from 'react-native';
import { math } from '../../utils';

import articulation from '../../../../assets/animations/articulation.json';
import moi_articulation from '../../../../assets/animations/moi-articulation.json';
import confusion from '../../../../assets/animations/confusion.json';
import estimate from '../../../../assets/animations/estimate.json';
import inattentive from '../../../../assets/animations/inattentive.json';
import mnemonics from '../../../../assets/animations/mnemonics.json';
import phonological from '../../../../assets/animations/phonological.json';

class ReadingAnimation extends React.Component {
  state = {
    progress: new Animated.Value(0),
    animationN: 0,
    modalIsShowing: false,
  }

  animatedTiming = () => {
    return Animated.timing(this.state.progress, {
      toValue: 1,
      duration: 4000,
      easing: Easing.linear,
      useNativeDriver: false,
    });
  }

  componentDidMount() {
    const { onFinishAnimation } = this.props;

    setTimeout(() => {
      this.setState(() => ({ modalIsShowing: true }))
      this.animatedTiming().start(() => {
        if(onFinishAnimation && typeof onFinishAnimation === 'function') onFinishAnimation();
      });
    }, 500)
  }

  reset = () => {
    this.anim.reset();
  }

  componentWillMount() {
    const randomN = math.getRandomInt(0, 1);
    this.setState({ animationN: randomN });
  }

  componentWillUnmount() {
    this.animatedTiming().stop();
  }

  randomAnim = (animationN) => {
    switch(animationN) {
      case 0:
        return articulation;
      case 1:
        return confusion;
      default:
        return articulation;
    }
  }

  render() {
    return (
      <Modal visible={this.state.modalIsShowing} transparent={true}>
        <View style={{ flex: 1, position: 'absolute', top: 0, left:0, height: '100%', width: '100%' }}>
          <LottieView
            ref={ref => { this.anim = ref }}
            source={confusion}
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
      </Modal>
    );
  }
}

export default ReadingAnimation;
