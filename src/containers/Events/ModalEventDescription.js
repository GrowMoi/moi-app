import React, { Component } from 'react';
import { View, Image } from 'react-native';
import styled from 'styled-components/native';
import { Palette, Size } from '../../commons/styles';
import ContentContainer from './ContentContainer';
import CloseIcon from './CloseIcon';
import { Header } from '../../commons/components/Typography';
import { normalize } from '../../commons/utils';
import MoiModal from '../Modal/MoiModal';
import Button from '../../commons/components/Buttons/Button';

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
      height: this.eventModalHeight,
    };
  }

  get eventModalWidth() {
    const { width } = this.props;
    return width > 500 ? 500 : width;
  }

  get eventModalHeight() {
    const { item: { buttonProps } } = this.props;
    return buttonProps ? Size.heigthModalEventInfo + 50 : Size.heigthModalEventInfo;
  }

  render() {
    const { item, open = true, animationType = 'slide', noOverlay = false, onClose } = this.props;

    const title = normalize.capitalizeFirstLetter(item.title);
    const description = normalize.capitalizeFirstLetter(item.description);
    const { buttonProps } = item;

    return (
      <MoiModal
        visible={open}
        transparent
        supportedOrientations={['portrait']}
        animationType={animationType}
        hardwareAccelerated
      >
        <Overlay noOverlay={noOverlay}>
          <View style={{ width: this.modalSize.width, height: this.modalSize.height, padding: 5, paddingTop: 10, alignItems: 'center' }}>
            <CloseIcon onPress={onClose} />
            <ContentContainer style={{ width: this.modalSize.width - 25, height: this.modalSize.height - 10 }} colorsMargin={['#344F39', '#344F39']} colorsContent={['#74AD50', '#74AD50']}>
              <Header bolder>{title}</Header>
              <View style={{ width: Size.iconSizeEventDescription, height: Size.iconSizeEventDescription, margin: 10 }}>
                <Image source={{ uri: item.image }} style={{ width: Size.iconSizeEventDescription, height: Size.iconSizeEventDescription }} />
              </View>
              <Header small ellipsizeMode='tail' numberOfLines={3}>{description}</Header>
              {buttonProps &&
              <View style={{flex: 1, justifyContent: 'center'}}>
                <Button {...buttonProps} style={{minWidth: 70}} />
              </View>
              }
            </ContentContainer>
          </View>
        </Overlay>
      </MoiModal>
    );
  }
};
