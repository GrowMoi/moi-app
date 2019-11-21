import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { TouchableWithoutFeedback, View, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
import { Size, Palette } from '../../styles';
import { colors } from '../../styles/palette';
import { Header } from '../Typography';
import Spinner from '../MoIcon/Spinner';

const StyledButton = styled(View)`
  padding-horizontal: ${props => props.containsImage ? 0 : Size.spaceSmall};
  padding-vertical: ${props => props.containsImage ? 0 : Size.spaceSmall};
  background-color: ${props => props.containsImage ? 'transparent' : (!props.disabled ? colors.blue : colors.grayBlue)};
  border-top-left-radius: 8;
  border-bottom-left-radius: 15;
  border-top-right-radius: 15;
  border-bottom-right-radius: 8;
  justify-content: center;
  align-items: center;
  shadow-offset: 0px 0px;
  shadow-opacity: 0.3;
  shadow-radius: 2;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const LeftIcon = styled(Ionicons)`
  margin-right: ${Size.spaceXSmall};
`;

const RightIcon = styled(Ionicons)`
  margin-left: ${Size.spaceXSmall};
`;

const AnimatableComponent = Animatable.createAnimatableComponent(StyledButton);

class Button extends Component {
  handleButtonRef = ref => this.button = ref;

  bounce = (e) => {
    const { onPress } = this.props;

    if(onPress) {
      this.button.bounceIn(800);
      setTimeout(() => {
        onPress(e);
      }, 200);
    }
  }

  onPressButton = (e) => {
    this.bounce(e);
  }

  render() {
    const { title, onPress, style, disabled, leftIcon, rightIcon, loading, image, ...rest } = this.props;

    let currentText
    if (loading) currentText = <Spinner />;
    else currentText = <Header small heavy>{title}</Header>;

    currentText = image ?
      <ImageBackground style={{width: 'auto', height: 'auto', paddingHorizontal: Size.spaceSmall, paddingVertical: Size.spaceSmall}} source={{uri: image}} resizeMode='stretch'>
        {currentText}
      </ImageBackground>
      :
      currentText;

    const CreamButton = (
      <AnimatableComponent ref={this.handleButtonRef} disabled={disabled} style={{ ...style, transform: [{ scale: 1 }] }} containsImage={!!image} >
        {!image && leftIcon && <LeftIcon name={leftIcon} size={20} color={Palette.colors.white.css()} />}

        {currentText}

        {!image && rightIcon && <RightIcon name={rightIcon} size={20} color={Palette.colors.white.css()} />}
      </AnimatableComponent>
    );

    return (
      <TouchableWithoutFeedback onPress={this.onPressButton} {...rest} disabled={loading ? true : disabled}>
        {CreamButton}
      </TouchableWithoutFeedback>
    );
  }
};


Button.defaultProps = {
  title: 'Button',
};

Button.propTypes = {
  onPress: PropTypes.func,
  title: PropTypes.string,
  style: PropTypes.any,
  disabled: PropTypes.bool,
  leftIcon: PropTypes.string,
  rightIcon: PropTypes.string,
};

export default Button;
