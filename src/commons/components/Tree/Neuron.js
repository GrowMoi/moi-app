import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  TouchableWithoutFeedback,
  Animated,
  View,
  UIManager,
  findNodeHandle,
} from 'react-native';
import styled, { css } from 'styled-components/native';
import * as Animatable from 'react-native-animatable';

import { math } from '../../utils';
import { Sound } from '../SoundPlayer';

export const NeuronContainer = styled(View)`
  justify-content: center;
  align-items: center;
  position: absolute;
  width: ${props => props.size || 1};
  height: ${props => props.size || 1};
  ${({ pos = {} }) => {
    if (pos.left) return css`left: ${pos.left}`;
    else if (pos.right) return css`right: ${pos.right}`;
  }};
  ${({ pos = {} }) => {
    if (pos.bottom) return css`bottom: ${pos.bottom}`;
    else if (pos.top) return css`top: ${pos.top}`;
  }};
`;
const NeuronAnimatable = Animatable.createAnimatableComponent(NeuronContainer);

const neuronWidth = 390;
const neuronHeight = 368;
const aspect = neuronWidth / neuronHeight;

const NeuronImage = styled(Animated.Image)`
  width: ${props => props.size};
  height: ${props => Math.round(props.size / aspect)};
  position: absolute;
  `;

export default class Neuron extends Component {
  handleRefNeuron = ref => this._neuron = ref;
  animatedValue = new Animated.Value(1);
  state = {
    showingLabel: false,
    measure: {},
  }

  onPressNeuron = (e) => {
    const { onPress } = this.props;

    this.measure(() => {
      if(onPress) onPress(this.state.measure);
    });
  }

  onPressIn = () => {
    Sound.stopOverBackgroundSound();
    Animated.spring(this.animatedValue, {
      toValue: 0.5,
    }).start();
  }

  onPressOut = () => {
    Animated.spring(this.animatedValue, {
      toValue: 1,
      friction: 3,
      tension: 40,
    }).start();
  }

  calculateSize(contentsLearned, totalContents) {
    const { max, min } = this.props.size;
    let value = min;
    if (totalContents) {
      const percentage = (max - min) / totalContents;
      value = (contentsLearned * percentage) + min;
    }

    return value;
  }

  get neuronColor() {
    const {
      color,
      contentsLearned,
    } = this.props;

    if (contentsLearned === 0 || !color) return 'neurona_descubierta';
    switch (color) {
      case 'blue':
        return 'neurona_color_azul';
      case 'yellow':
        return 'neurona_color_amarillo';
      case 'orange':
        return 'neurona_color_naranja';
      case 'dark_orange':
        return 'neurona_color_naranja_oscuro';
      case 'fuchsia':
        return 'neurona_color_fucsia';
      case 'green':
        return 'neurona_color_verde';
      default:
        return 'neurona_descubierta';
    }
  }

  onLayout = (e) => {
    this.measure();
  }

  measure = (cb = () => null) => {
    UIManager.measure(findNodeHandle(this.view), (x, y, width, height, pageX, pageY) => {
      this.setState(
        () => ({
          measure: {
            x, y, width, height, pageX, pageY,
          },
        }),
        () => { cb() }
      )
    })
  }


  render() {
    const {
      position,
      style,
      size,
      contentsLearned,
      totalContents,
      name,
    } = this.props;
    const { showingLabel } = this.state;
    const { max: maxSize } = size;
    const animatedStyle = { transform: [{ scale: this.animatedValue }] };
    const neuronSize = this.calculateSize(contentsLearned, totalContents);

    let neuronProps = {
      size: maxSize,
      pos: position,
    };

    const ANIMATION_DURATION = 2000;
    const delayAnimation = { max: 5000, min: 100 };
    const delay = math.getRandomInt(delayAnimation.min, delayAnimation.max);

    const animationProps = {
      delay,
      animation: 'rubberBand',
      iterationCount: 'infinite',
      duration: ANIMATION_DURATION,
      easing: 'ease-in-out',
    };

    if(contentsLearned === 0) {
      neuronProps = {
        ...neuronProps,
        ...animationProps,
      }
    }

    return (
      <NeuronAnimatable
        onLayout={this.onLayout}
        ref={ref => this.view = ref}
        {...neuronProps}
      >
        <TouchableWithoutFeedback
          onPressOut={this.onPressOut}
          onPressIn={this.onPressIn}
          onPress={this.onPressNeuron}
        >
          <NeuronImage
            size={neuronSize}
            style={[animatedStyle, style]}
            source={{uri: this.neuronColor}}
            resizeMode='contain'
          />
        </TouchableWithoutFeedback>
      </NeuronAnimatable>
    );
  }
}

Neuron.defaultProps = {
  size: {
    max: 50,
    min: 30,
  },
  position: {},
  contentsLearned: 0,
  totalContents: 4,
};

Neuron.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  color: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]),
  state: PropTypes.string,
  size: PropTypes.shape({
    max: PropTypes.number,
    min: PropTypes.number,
  }),
  totalContents: PropTypes.number,
  contentsLearned: PropTypes.number,
  style: PropTypes.object,
  onPress: PropTypes.func,
  position: PropTypes.shape({
    top: PropTypes.number,
    bottom: PropTypes.number,
    left: PropTypes.number,
    right: PropTypes.number,
  }),
};
