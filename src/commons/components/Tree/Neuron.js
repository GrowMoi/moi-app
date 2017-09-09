import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TouchableWithoutFeedback, Animated, View } from 'react-native';
import styled, { css } from 'styled-components/native';
import neuronaDescubierta from '../../../../assets/images/neurona/neurona_descubierta.png';

const NeuronContainer = styled(View)`
  justify-content: center;
  align-items: center;
  width: ${props => props.size};
  height: ${props => props.size};
  ${props => props.pos.left && css`
    left: ${props.pos.left};
  `};
  ${props => props.pos.right && css`
    right: ${props.pos.right};
  `};
  ${props => props.pos.bottom && css`
    bottom: ${props.pos.bottom};
  `};
  ${props => props.pos.top && css`
    top: ${props.pos.top};
  `};
`;

const NeuronImage = styled(Animated.Image)`
  width: ${props => props.size};
  height: ${props => props.size};
  position: absolute;
`;

export default class Neuron extends Component {
  componentWillMount() {
    this.animatedValue = new Animated.Value(1);
  }

  onPressNeuron = (e) => {
    // Alert.alert('Hi');
    const { onPress } = this.props;
    if (onPress) onPress(e);
  }

  onPressIn = () => {
    Animated.spring(this.animatedValue, {
      toValue: 0.8,
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
    const percentage = (max - min) / totalContents;
    const value = (contentsLearned * percentage) + min;

    return value;
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
            source={neuronaDescubierta}
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
    min: 35,
  },
};

Neuron.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  color: PropTypes.string,
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
