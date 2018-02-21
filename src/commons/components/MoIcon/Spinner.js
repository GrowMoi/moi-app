import React, { Component } from 'react';
import { Animated, Easing } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

import { Palette } from '../../styles';

const Icon = Animated.createAnimatedComponent(FontAwesome);

export default class Spinner extends Component {
  spinValue = new Animated.Value(0);

  componentDidMount() {
    this.animate();
  }

  componentWillUnmount() {
    this.animation.stop();
  }

  get animation() {
    const { duration = 2000 } = this.props;

    return (
      Animated.timing(
        this.spinValue,
        {
          toValue: 1,
          duration: duration,
          easing: Easing.linear,
          useNativeDriver: true
        }
      )
    );
  }

  animate = () => {
    this.animation.start(() => this.animate());
  }

  render() {
    const { size = 18, color = Palette.dark.css() } = this.props;
    const spin = this.spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ["0deg", "360deg"]
    });

    return (
      <Icon
        style={{transform: [{ 'rotate': spin }]}}
        name="spinner"
        size={size}
        color={color}
      />
    )
  }
}
