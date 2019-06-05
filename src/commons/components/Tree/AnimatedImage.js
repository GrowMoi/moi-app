import React, { Component } from 'react';
import { Animated, Image } from 'react-native';

export class AnimatedImage extends Component {
  state = {
    opacity: new Animated.Value(0),
    verticalPosition: 0,
    horizontalPosition: {
      position: 'left',
      flexPosition: 'flex-start'
    }
  }

  animation;

  componentWillMount() {
    this.initialValuesAnimation(true);
    setTimeout(() => {
      this.showAnimatedImage();
    }, 1000);
  }

  componentDidMount() {
    const { infiniteLoop } = this.props;

    this.animation = this.createAnimation();
    this.initAnimation(infiniteLoop);
  }

  componentWillUnmount() {
    this.animation.stop();
    this.animation = null;
  }

  showAnimatedImage() {
    Animated.timing(this.state.opacity, {
      toValue: 1,
      duration: 2000,
    }).start();
  }

  initialValuesAnimation(firstTime) {
    const { minValue, maxValue, verticalPosition, horizontalPosition } = this.props;
    const initialValue = firstTime ? this.calculateIntermediateValue(minValue + 150, maxValue - 150) : 0;

    this.setState({ animationValue: new Animated.Value(initialValue), verticalPosition: verticalPosition(), horizontalPosition: horizontalPosition() });
  }

  createAnimation() {
    const { maxValue, timeRange, animationTime = 1000 } = this.props;
    const { animationValue } = this.state;
    return Animated.timing(
      animationValue,
      {
        toValue: maxValue || 300,
        duration: timeRange ? this.calculateIntermediateValue(timeRange[0], timeRange[1]) : animationTime,
      }
    );
  }

  initAnimation(infiniteLoop) {
    const { minValue, verticalPosition, horizontalPosition } = this.props;
    if (!this.animation) return;
    this.animation.start(() => {
      if (infiniteLoop) {
        this.initialValuesAnimation();
        this.animation = this.createAnimation();
        this.initAnimation(true);
      }
    });
  }

  calculateIntermediateValue(minValue, maxValue) {
    return Math.random() * (maxValue - minValue) + minValue;
  }

  render() {
    const { source } = this.props;
    const { animationValue, verticalPosition, horizontalPosition, opacity } = this.state;

    return (
      <Animated.View
        style={{
          opacity: opacity,
          position: 'absolute',
          top: verticalPosition,
          justifyContent: horizontalPosition.flexPosition,
          alignItems: horizontalPosition.flexPosition,
          [horizontalPosition.position]: animationValue,
        }}
      >
        <Image source={{ uri: source }} style={{ width: 80, height: 60 }} />
      </Animated.View>
    );
  }
}
