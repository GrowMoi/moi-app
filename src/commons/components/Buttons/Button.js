import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { TouchableWithoutFeedback, View } from 'react-native';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
import { Size } from '../../styles';
import { colors } from '../../styles/palette';
import { Header } from '../Typography';
import Spinner from '../MoIcon/Spinner';

const StyledButton = styled(View)`
  padding-horizontal: ${Size.spaceSmall};
  padding-vertical: ${Size.spaceSmall};
  background-color: ${props => (!props.disabled ? colors.creamButton : colors.darkGreen)};
  border-radius: 3px;
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
      this.button.bounceIn(800)
        .then(endState => {
          onPress(e);
        });
    }
  }

  onPressButton = (e) => {
    this.bounce(e);
  }

  render() {
    const { title, onPress, style, disabled, leftIcon, rightIcon, loading, ...rest } = this.props;

    let currentText
    if (loading) currentText = <Spinner />;
    else currentText = <Header small heavy>{ title }</Header>;

    const CreamButton = (
      <AnimatableComponent ref={this.handleButtonRef} disabled={disabled} style={ {...style, transform: [{ scale: 1 }]} } >
        {leftIcon && <LeftIcon name={leftIcon} size={20} color="#4b4a21" />}

        {currentText}

        {rightIcon && <RightIcon name={rightIcon} size={20} color="#4b4a21" />}
      </AnimatableComponent>
    );

    return (
      <TouchableWithoutFeedback onPress={this.onPressButton} { ...rest } disabled={loading ? true : disabled}>
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
