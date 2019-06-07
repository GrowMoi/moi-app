import React, { Component } from 'react';
import { View, Image } from 'react-native';
import styled from 'styled-components/native';
import Modal from 'expo/src/modal/Modal';
import { Palette } from '../../commons/styles';
import ContentContainer from './ContentContainer';
import CloseIcon from './CloseIcon';
import { Header } from '../../commons/components/Typography';
import { normalize } from '../../commons/utils';

const Overlay = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.noOverlay ? 'transparent' : Palette.black.alpha(0.7).css()};
`;

export default class ModalEventDescription extends Component {
  get modalSize() {
    const width = this.eventModalWidth;

    return {
      width: width / 1.3,
      height: 275,
    };
  }

  get eventModalWidth() {
    const { width } = this.props;
    return width > 500 ? 500 : width;
  }

  render() {
    const { event, open = true, animationType = 'slide', noOverlay = false, onClose } = this.props;

    return (
      <Modal
        visible={open}
        transparent
        supportedOrientations={['portrait']}
        animationType={animationType}
        hardwareAccelerated
      >
        <Overlay noOverlay={noOverlay}>
          <View style={{ width: this.modalSize.width, height: this.modalSize.height, padding: 5, paddingTop: 10, alignItems: 'center' }}>
            <CloseIcon onPress={onClose} />
            <ContentContainer style={{ width: this.modalSize.width - 25, height: this.modalSize.height - 10}} colorsMargin={['#344F39', '#344F39']} colorsContent={['#74AD50', '#74AD50']}>
                <Header bolder>{normalize.capitalizeFirstLetter(event.title)}</Header>}
                <View style={{ width: 130, height: 130, margin: 10 }}>
                  <Image source={{ uri: event.image }} style={{ width: 130, height: 130 }} />
                </View>
                <Header small ellipsizeMode='tail' numberOfLines={3}>{normalize.capitalizeFirstLetter(event.description)}</Header>
            </ContentContainer>
          </View>
        </Overlay>
      </Modal>
    );
  }
};
