import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TouchableWithoutFeedback, Animated } from 'react-native';
import styled, { css } from 'styled-components/native';
import neuronaDescubierta from '../../../../assets/images/neurona/neurona_descubierta.png';

const NeuronImage = styled(Animated.Image)`
  width: ${props => props.size};
  height: ${props => props.size};
  position: absolute;
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

export default class Neuron extends Component {
  componentWillMount() {
    this.animatedValue = new Animated.Value(1);
  }

  onPress = () => {
    // Alert.alert('Hi');
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

  render() {
    const { position, size, style } = this.props;
    const animatedStyle = {
      transform: [{ scale: this.animatedValue }],
    };

    return (
      <TouchableWithoutFeedback
        onPressOut={this.onPressOut}
        onPressIn={this.onPressIn}
        onPress={this.onPress}
      >
        <NeuronImage
          pos={position}
          style={[animatedStyle, style]}
          size={size}
          source={neuronaDescubierta}
          resizeMode='contain'
        />
      </TouchableWithoutFeedback>
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
  style: PropTypes.object,
  position: PropTypes.shape({
    top: PropTypes.number,
    bottom: PropTypes.number,
    left: PropTypes.number,
    right: PropTypes.number,
  }),
};
