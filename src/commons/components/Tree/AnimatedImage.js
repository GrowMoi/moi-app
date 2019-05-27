import React, { Component } from 'react';
import { Animated, Image } from 'react-native';

export class AnimatedImage extends Component {
  state = {
    animationValue: new Animated.Value(0),
    verticalPosition: 0,
    horizontalPosition: {
      position: 'left',
      flexPosition: 'flex-start'
    }
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

  componentWillUnmount() {
    this.animation.stop();
    this.animation = null;
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
    const { minValue, verticalPosition,  horizontalPosition } = this.props;
    if(!this.animation) return;
    this.animation.start(() => {
      if (infiniteLoop) {
        this.setState({
          animationValue: new Animated.Value(minValue || 0),
          verticalPosition: verticalPosition(),
          horizontalPosition: horizontalPosition(),
          });
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
    const { source } = this.props;
    const { animationValue, verticalPosition, horizontalPosition } = this.state;
    console.log("TCL: AnimatedImage -> render -> source", source)

    return (
      <Animated.View
        style={{
          position: 'absolute',
          top: verticalPosition,
          justifyContent: horizontalPosition.flexPosition,
          alignItems: horizontalPosition.flexPosition,
          [horizontalPosition.position]: animationValue,
        }}
      >
        <Image source={{uri: source}} style={{width: 80, height: 60}} />
      </Animated.View>
    );
  }
}
