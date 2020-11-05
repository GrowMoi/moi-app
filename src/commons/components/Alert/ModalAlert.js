import React, { Component } from 'react';
import { View, Image } from 'react-native';
import styled from 'styled-components/native';
import { Palette, Size } from '../../styles';
import { Header } from '../../components/Typography';
import { normalize } from '../../utils';
import Button from '../../components/Buttons/Button';
import MoiModal from '../../../containers/Modal/MoiModal';
import CloseIcon from '../../../containers/Events/CloseIcon';
import ContentContainer from '../../../containers/Events/ContentContainer';

const Overlay = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.noOverlay ? 'transparent' : Palette.black.alpha(0.7).css()};
`;

const ContentSection = styled(View)`
  ${props => props.flex ?
    'flex: ' + props.flex :
    'height: auto'}
  justify-content: center;
`;

const ButtonsContainer = styled(View)`
  margin-top: 20;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: ${props => props.width};
  padding-horizontal: 20;
`;

const ButtonView = styled(View)`
 width: 45%;
`;

const colorsMargin = ['#344F39', '#344F39'];
const colorsContent = ['#74AD50', '#74AD50'];

export default class ModalAlert extends Component {
  get modalSize() {
    const width = this.modalWidth;

    return {
      width: width / 1.2,
      height: this.modalHeight,
    };
  }

  get modalWidth() {
    const { width } = this.props;
    return width > 500 ? 500 : width;
  }

  get modalHeight() {
    const { item: { image } } = this.props;
    let heightModal = Size.heigthModalAlert;
    heightModal = image ? heightModal + Size.iconSizeModalAlert : heightModal;
    return heightModal;
  }

  render() {
    const { item: { title, description, image }, open = true, animationType = 'fade', noOverlay = false, onClose, okButtonProps, cancelButtonProps, defaultButton } = this.props;

    const itemTitle = normalize.capitalizeFirstLetter(title);
    const itemDescription = normalize.capitalizeFirstLetter(description);

    const imageStyle = {
      width: Size.iconSizeModalAlert,
      height: Size.iconSizeModalAlert
    };

    const modalWidth = this.modalSize.width;
    const modalHeight = this.modalSize.height;
    const mainButtonProps = okButtonProps ? okButtonProps : {
      title: 'OK',
      onPress: onClose,
    };

    const showButtons = okButtonProps || cancelButtonProps || defaultButton;
    const showMainButton = defaultButton || okButtonProps;

    return (
      <MoiModal
        visible={open}
        transparent
        supportedOrientations={['portrait']}
        animationType={animationType}
        hardwareAccelerated
      >
        <Overlay noOverlay={noOverlay}>
          <View style={{ width: modalWidth, height: modalHeight, padding: 5, paddingTop: 10, alignItems: 'center' }}>
            <CloseIcon onPress={onClose} />
            <ContentContainer width={modalWidth - 25} height={modalHeight - 10} colorsMargin={colorsMargin} colorsContent={colorsContent}>
              <ContentSection>
                <Header bolder center style={{ marginTop: 5, marginBottom: 10 }}>{itemTitle}</Header>
              </ContentSection>

              {image ? <ContentSection flex={4}>
                <Image source={{ uri: image }} style={imageStyle} />
              </ContentSection> : null}

              <ContentSection flex={2}>
                <Header small ellipsizeMode='tail' numberOfLines={3} center style={{ marginLeft: 5, marginRight: 5, marginTop: 10 }}>{itemDescription}</Header>
              </ContentSection>
            </ContentContainer>
          </View>
          {showButtons && <ButtonsContainer width={modalWidth}>
            <ButtonView>
              {cancelButtonProps && <Button {...cancelButtonProps} onPress={cancelButtonProps.onPress || onClose} style={{ width: '100%' }} />}
            </ButtonView>
            <ButtonView>
              {showMainButton && <Button {...mainButtonProps} style={{ width: '100%' }} />}
            </ButtonView>
          </ButtonsContainer>}
        </Overlay>
      </MoiModal>
    );
  }
};
