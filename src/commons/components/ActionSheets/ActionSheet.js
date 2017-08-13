import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, Modal, TouchableOpacity, Animated } from 'react-native';
import styled from 'styled-components/native';
import { Palette } from '../../styles';

const Overlay = styled(TouchableOpacity)`
  background-color: ${Palette.black.alpha(0.2).css()};
  justify-content: flex-end;
  align-self: stretch;
  flex: 1;
`;

const OptionsBox = styled(Animated.View)`
  background-color: white;
  position: relative;
`;

const Option = styled(TouchableOpacity)`
  padding-horizontal: 20;
  padding-vertical: 13;
`;

const TextCancel = styled(Text)`
  color: red;
`;

const options = [
  'Galería',
  'Recomendaciones',
  'Perfil',
  'Links Relacionados',
  'Notas',
];

export default class ActionSheet extends Component {
  state = {
    translate: new Animated.ValueXY({ x: 0, y: 400 }),
  }

  dismiss = () => {
    const { onDismiss } = this.props;
    if (onDismiss) {
      setTimeout(() => {
        onDismiss();
      }, 150);
    }
    this.triggerOptions('hide');
  }

  onShow = () => {
    this.triggerOptions();
  }

  triggerOptions(state) {
    const { translate } = this.state;
    const valueY = state === 'hide' ? 400 : 0;

    Animated.spring(translate, {
      toValue: { x: 0, y: valueY },
      duration: 100,
    }).start();
  }

  render() {
    const { translate } = this.state;
    const { visible } = this.props;

    const transitionStyles = {
      transform: translate.getTranslateTransform(),
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
            {options.map((option, i) => (
              <Option key={i}>
                <Text>{option}</Text>
              </Option>
            ))}
            <Option onPress={this.dismiss}>
              <TextCancel>Cancel</TextCancel>
            </Option>
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
};
