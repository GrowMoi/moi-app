import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'expo';
import { Modal, TouchableOpacity, Animated, Platform } from 'react-native';
import styled from 'styled-components/native';
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
  state = {
    translate: new Animated.ValueXY({ x: 0, y: 400 }),
  }

  dismiss = () => {
    const { onDismiss } = this.props;
    if (onDismiss) {
      setTimeout(() => {
        onDismiss();
      }, 200);
    }
    this.triggerOptions('hide');
  }

  onShow = () => {
    this.triggerOptions();
  }

  triggerOptions(state) {
    const { translate } = this.state;
    const valueY = state === 'hide' ? 400 : 0;

    Animated.timing(translate, {
      toValue: { x: 0, y: valueY },
      duration: 250,
    }).start();
  }

  render() {
    const { translate } = this.state;
    const { visible, hasCancelOption, options = [] } = this.props;

    const transitionStyles = {
      transform: translate.getTranslateTransform(),
      opacity: 1,
    };

    return (
      <Modal
        animationType='none'
        transparent
        visible={visible}
        onRequestClose={this.dismiss}
        onShow={this.onShow}
      >
        <Overlay onPress={this.dismiss} activeOpacity={1}>
          <OptionsBox style={transitionStyles}>
            {options.length > 0 && options.map((option, i) => (
              <Option key={i}>
                <OptionIcon name={option.icon} size={20} />
                <TextBody>{option.label}</TextBody>
              </Option>
            ))}
            {hasCancelOption && (
              <CancelOption onPress={this.dismiss}>
                <OptionIcon name='md-close' size={20} />
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
  onDismiss: PropTypes.func,
  hasCancelOption: PropTypes.bool,
  options: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    icon: PropTypes.string,
  })).isRequired,
};
