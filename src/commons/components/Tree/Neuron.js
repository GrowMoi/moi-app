import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Image, TouchableOpacity, Animated } from 'react-native';
import styled, { css } from 'styled-components/native';
import neuronaDescubierta from '../../../../assets/images/neurona/neurona_descubierta.png';

const NeuronImage = styled(Animated.Image)`
  width: ${props => props.size};
  height: ${props => props.size};
`;

const TouchableNeuron = styled(TouchableOpacity)`
  position: absolute;
  ${props => css`
    top: ${props.pos.top || 0};
    bottom: ${props.pos.bottom || 0};
    right: ${props.pos.right || 0};
    left: ${props.pos.left || 0};
  `};
`;

export default class Neuron extends Component {
  render() {
    const { position, size } = this.props;

    return (
      <TouchableNeuron
        pos={position}
        activeOpacity={0.8}
      >
        <NeuronImage
          size={size}
          source={neuronaDescubierta}
          resizeMode='contain'
        />
      </TouchableNeuron>
    );
  }
}

Neuron.defaultProps = {
  size: 35,
};

Neuron.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  color: PropTypes.string,
  state: PropTypes.string,
  size: PropTypes.number,
  position: PropTypes.shape({
    top: PropTypes.number,
    bottom: PropTypes.number,
    left: PropTypes.number,
    right: PropTypes.number,
  }),
};
