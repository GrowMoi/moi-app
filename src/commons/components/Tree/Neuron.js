import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TouchableWithoutFeedback, Animated, View } from 'react-native';
import styled, { css } from 'styled-components/native';
import neuronaDescubierta from '../../../../assets/images/neurona/neurona_descubierta.png';
import neuronaAzul from '../../../../assets/images/neurona/neurona_color_azul.png';
import neuronaVerde from '../../../../assets/images/neurona/neurona_color_verde.png';
import neuronaFucsia from '../../../../assets/images/neurona/neurona_color_fucsia.png';
import neuronaNaranja from '../../../../assets/images/neurona/neurona_color_naranja.png';
import neuronaAmarilla from '../../../../assets/images/neurona/neurona_color_amarillo.png';
import neuronaNaranjaOscuro from '../../../../assets/images/neurona/neurona_color_naranja_oscuro.png';

export const NeuronContainer = styled(View)`
  justify-content: center;
  align-items: center;
  position: absolute;
  width: ${props => props.size || 0};
  height: ${props => props.size || 0};
  ${({ pos = {} }) => {
    if (pos.left) return css`left: ${pos.left}`;
    else if (pos.right) return css`right: ${pos.right}`;
  }};
  ${({ pos = {} }) => {
    if (pos.bottom) return css`bottom: ${pos.bottom}`;
    else if (pos.top) return css`top: ${pos.top}`;
  }};
  `;

const neuronWidth = 390;
const neuronHeight = 368;
const aspect = neuronWidth / neuronHeight;

const NeuronImage = styled(Animated.Image)`
  width: ${props => props.size};
  height: ${props => Math.round(props.size / aspect)};
  position: absolute;
  `;

export default class Neuron extends Component {
  componentWillMount() {
    this.animatedValue = new Animated.Value(1);
  }

  onPressNeuron = (e) => {
    const { onPress } = this.props;
    if (onPress) {
      setTimeout(() => {
        onPress(e);
      }, 250);
    }
  }

  onPressIn = () => {
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

    if (contentsLearned === 0 || !color) return neuronaDescubierta;
    switch (color) {
      case 'blue':
        return neuronaAzul;
      case 'yellow':
        return neuronaAmarilla;
      case 'orange':
        return neuronaNaranja;
      case 'dark_orange':
        return neuronaNaranjaOscuro;
      case 'fuchsia':
        return neuronaFucsia;
      case 'green':
        return neuronaVerde;
      default:
        return neuronaDescubierta;
    }
  }

  render() {
    const {
      position,
      style,
      size,
      contentsLearned,
      totalContents,
    } = this.props;
    const { max: maxSize } = size;
    const animatedStyle = { transform: [{ scale: this.animatedValue }] };
    const neuronSize = this.calculateSize(contentsLearned, totalContents);

    return (
      <NeuronContainer
        size={maxSize}
        pos={position}
      >
        <TouchableWithoutFeedback
          onPressOut={this.onPressOut}
          onPressIn={this.onPressIn}
          onPress={this.onPressNeuron}
        >
          <NeuronImage
            size={neuronSize}
            style={[animatedStyle, style]}
            source={this.neuronColor}
            resizeMode='contain'
          />
        </TouchableWithoutFeedback>
      </NeuronContainer>
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
