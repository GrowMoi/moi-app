import React, { Component } from 'react';
import { Animated, Image } from 'react-native';

export class AnimatedImage extends Component {
  state = {
    animationValue: new Animated.Value(0)
  }

  animation;

  componentDidMount() {
    const { infiniteLoop, minValue, delayStart = 0 } = this.props;

    if (minValue) this.setState({ animationValue: new Animated.Value(minValue) });

    this.animation = this.createAnimation();
    setTimeout(() => {
      this.initAnimation(infiniteLoop);
    }, delayStart);
  }

  createAnimation() {
    const { maxValue } = this.props;
    const { animationValue } = this.state;
    return Animated.timing(
      animationValue,
      {
        toValue: maxValue || 300,
        duration: this.getAnimationTime()
      }
    );
  }

  initAnimation(infiniteLoop) {
    this.animation.start(() => {
      if (infiniteLoop) {
        this.setState({ animationValue: new Animated.Value(this.props.minValue || 0) });
        this.animation = this.createAnimation();
        this.initAnimation(true);
      }
    });
  }

  getAnimationTime() {
    const { timeRange, animationTime = 1000 } = this.props;
    if(timeRange) {
      return Math.random() * (timeRange[1] - timeRange[0]) + timeRange[0];
    } else {
      return animationTime;
    }
  }

  render() {
    const { style, source, propertyToAnimate } = this.props;
    const { animationValue } = this.state;

    return (
      <Animated.View
        style={{
          ...style,
          [propertyToAnimate]: animationValue,
        }}
      >
        <Image source={source} />
      </Animated.View>
    );
  }
}