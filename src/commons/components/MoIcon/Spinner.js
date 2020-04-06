import React, { Component } from 'react';
import { Animated, Easing } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import styled from 'styled-components/native';

import { Palette } from '../../styles';

const StyledIcon = styled(FontAwesome)`
  background-color: transparent;
`;
const Icon = Animated.createAnimatedComponent(StyledIcon);

export default class Spinner extends Component {
  spinValue = new Animated.Value(0);

  componentDidMount() {
    this.spin()
  }

  spin = () => {
    const { duration = 2000 } = this.props;

    this.spinValue.setValue(0)
    Animated.timing(
      this.spinValue,
      {
        toValue: 1,
        duration: duration,
        easing: Easing.linear,
        useNativeDriver: true
      }
    ).start(() => this.spin())
  }

  render() {
    const { size = 18, color = Palette.dark.css(), name = 'spinner' } = this.props;
    const spin = this.spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ["0deg", "360deg"]
    });

    return (
      <Icon
        style={{transform: [{ 'rotate': spin }]}}
        name={name}
        size={size}
        color={color}
      />
    )
  }
}
