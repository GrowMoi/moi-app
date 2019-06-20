import React, { Component } from 'react';
import { Animated, Image } from 'react-native';
import { getHeightAspectRatio } from '../../utils';

const width = 873;
const height = 1146;

const minDuration = 2000;
const maxDuration = 3000;

export default class AnimatedTree extends Component {

  state = {
    topPosition: new Animated.Value(50),
  }

  topAnimation;
  treeShouldGoUp = false;

  componentDidMount() {
    this.topAnimation = this.createTopAnimation();
    this.initAnimation();
  }

  initAnimation() {
    if (!this.topAnimation) return;
    this.topAnimation.start(() => {
      this.topAnimation = this.createTopAnimation();
      this.initAnimation();
    });

  }

  getNextPosition(current) {
    let value;
    if(this.treeShouldGoUp) {
      value = current - 20;
    } else {
      value = current + 20;
    }

    this.treeShouldGoUp = !this.treeShouldGoUp;
    return value;
  }

  getRandomDuration() {
    return Math.random() * (maxDuration - minDuration) + minDuration;
  }

  createTopAnimation() {
    const { topPosition } = this.state;
    return Animated.timing(
      topPosition,
      {
        toValue: this.getNextPosition(topPosition._value),
        duration: this.getRandomDuration(),
      }
    );
  }

  render() {

    const { topPosition } = this.state;

    return (
      <Animated.View
        style={{
          position: 'absolute',
          justifyContent: 'center',
          alignItems: 'center',
          top: topPosition,
          width: 320,
          height: getHeightAspectRatio(width, height, 320),
        }}
      >
        <Image source={{ uri: 'tree_splash' }} style={{ width: 320, height: getHeightAspectRatio(width, height, 320) }} />
      </Animated.View>
    );
  }
}