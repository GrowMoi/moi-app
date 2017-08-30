import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'expo';
import { Modal, TouchableOpacity, Animated, Platform } from 'react-native';
import styled, { css } from 'styled-components/native';
import { TextBody } from '../Typography';
import { Palette, Size } from '../../styles';

const Overlay = styled(TouchableOpacity)`
  background-color: ${Palette.black.alpha(0.2).css()};
  justify-content: ${Platform.OS === 'android' ? 'center' : 'flex-end'};
  align-self: stretch;
  flex: 1;
`;

const OptionsBox = styled(Animated.View)`
  background-color: white;
  position: relative;
  margin-horizontal: ${Platform.OS === 'android' ? Size.spaceLarge : 0};
  ${Platform.OS === 'android' && css`
    width: 280;
    align-self: center;
    shadow-opacity: 0.3;
    shadow-radius: 2.5px;
    shadow-color: ${Palette.black.alpha(0.4).css()};
    shadow-offset: 0 0;
  `};
`;

const Option = styled(TouchableOpacity)`
  padding-horizontal: 20;
  padding-vertical: 13;
  flex-direction: row;
  justify-content: flex-start;
`;

const OptionIcon = styled(Icon.Ionicons)`
  margin-right: 10;
`;

const CancelOption = styled(Option)`
  border-top-width: 1;
  border-top-color: ${Palette.neutral.alpha(0.3).css()};
  padding-vertical: 20;
`;

export default class ActionSheet extends Component {
  scaleValue = new Animated.Value(0)
  translateValue = new Animated.ValueXY({ x: 0, y: 400 })

  dismiss = () => {
    const { dismiss } = this.props;
    if (dismiss) setTimeout(() => dismiss(), 200);
    this.triggerOptions('hide');
  }

  onShow = () => {
    this.triggerOptions();
  }

  triggerOptions(state) {
    const valueY = state === 'hide' ? 400 : 0;
    const scaleValue = state === 'hide' ? 0 : 1;

    if (Platform.OS === 'android') {
      Animated.spring(this.scaleValue, {
        toValue: scaleValue,
      }).start();
    } else {
      Animated.timing(this.translateValue, {
        toValue: { x: 0, y: valueY },
        duration: 250,
      }).start();
    }
  }

  render() {
    const { visible, hasCancelOption, options = [], ...rest } = this.props;
    const iconSize = 20;
    const nearFar = this.scaleValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [1, 1.05, 1],
    });
    const currentAnim = Platform.OS === 'android'
      ? { transform: [{ scale: nearFar }] }
      : { transform: this.translateValue.getTranslateTransform() };

    return (
      <Modal
        animationType='none'
        transparent
        visible={visible}
        onRequestClose={this.dismiss}
        onShow={this.onShow}
        {...rest}
      >
        <Overlay onPress={this.dismiss} activeOpacity={1}>
          <OptionsBox style={currentAnim}>
            {options.length > 0 && options.map((option, i) => (
              <Option key={i}>
                <OptionIcon name={option.icon} size={iconSize} />
                <TextBody>{option.label}</TextBody>
              </Option>
            ))}
            {hasCancelOption && (
              <CancelOption onPress={this.dismiss}>
                <OptionIcon name='md-close' size={iconSize} />
                <TextBody>Cancel</TextBody>
              </CancelOption>
            )}
          </OptionsBox>
        </Overlay>
      </Modal>
    );
  }
}

ActionSheet.defaultProps = {
  visible: true,
};

ActionSheet.propTypes = {
  visible: PropTypes.bool,
  dismiss: PropTypes.func,
  hasCancelOption: PropTypes.bool,
  options: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    icon: PropTypes.string,
  })).isRequired,
};
