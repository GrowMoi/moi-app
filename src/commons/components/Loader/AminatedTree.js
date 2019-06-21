import React, { Component } from 'react';
import { Animated, Image } from 'react-native';
import { getHeightAspectRatio } from '../../utils';

const width = 873;
const height = 1146;

const minDuration = 2000;
const maxDuration = 3000;

export default class AnimatedTree extends Component {
  constructor(props) {
    super(props);
    const topPosition = props.generateTopPosition;
      this.state = {
        // topPosition: new Animated.Value(props.isLandscape ? 15 : 30),
        topPosition: new Animated.Value(props.isLandscape ? topPosition(4.7) : topPosition(5.3)),
      }
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
      value = current - 10;
    } else {
      value = current + 10;
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
    const { width: containerWidth, isLandscape } = this.props;
    const { topPosition } = this.state;

    const percentageToReduce = isLandscape ? 0.5 : 0.1;
    const treeWidth = containerWidth - (containerWidth * percentageToReduce);

    return (
      <Animated.View
        style={{
          position: 'absolute',
          justifyContent: 'center',
          alignItems: 'center',
          top: topPosition,
          width: treeWidth,
          height: getHeightAspectRatio(width, height, treeWidth),
        }}
      >
        <Image source={{ uri: 'tree_splash' }} style={{ width: treeWidth, height: getHeightAspectRatio(width, height, treeWidth) }} />
      </Animated.View>
    );
  }
}