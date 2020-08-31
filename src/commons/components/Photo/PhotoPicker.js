import React, { Component } from 'react';
import { View, ImageBackground, TouchableOpacity, Platform } from 'react-native';
import styled, { css } from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import * as ImagePicker from 'expo-image-picker';
import uuid from 'uuid';
import ModalOptions from '../ModalOptions/ModalOptions';
import Palette from '../../styles/palette';

const Preview = styled(TouchableOpacity)`
  border-radius: 5;
  ${props => props.width && css`
    width: ${({ width }) => width};
  `}
  ${props => props.height && css`
    height: ${({ height }) => height};
  `}
  ${props => !props.children && props.bgColor && css`
    background-color: ${({ bgColor }) => bgColor ? bgColor : Palette.neutralLight };
  `};
  overflow: visible;
`

const Container = styled(View)`
  overflow: visible;
  position: relative;
`;

const ImagePreview = styled(ImageBackground)`
  border-radius: 5;
  width: ${({ width }) => width ? width : 200 };
  height: ${({ height }) => height ? height : 200 };
  flex: 1;
  justify-content: flex-end;
  align-items: flex-end;
  padding-right: 10;
  padding-bottom: 6;
`;

const IconContent = styled(View)`
  ${props => !props.width && !props.height && css`
    position: absolute;
  `}
  background-color: ${Palette.accent};
  bottom: 0;
  right: 0;
  width: 25;
  height: 25;
  border-radius: 30;
  justify-content: center;
  align-items: center;
`;

const IconPhoto = styled(Ionicons)`
  color: ${Palette.neutral};
`;

export default class PhotoPicker extends Component {
  state = {
    image: null,
    isModalOpen: false,
    selectedAction: null
  }

  _setModalVisible = visible => {
    this.setState({isModalOpen: visible});
  }

  _takePhoto = async() => {
    const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();
    const { status: rollStatus } = await ImagePicker.requestCameraRollPermissionsAsync();

    if(cameraStatus === 'granted' && rollStatus === 'granted') {
      try {
        const result = await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: false,
          aspect: [4, 3],
          base64: true
        });
        this.conditionImageState(result)
      } catch (error) {
        console.log(error);
      }
    }

  }

  _pickPhoto = async() => {
    const { status: rollStatus } = await ImagePicker.requestCameraRollPermissionsAsync();

    if(rollStatus === 'granted') {
      try {
        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: false,
          aspect: [4, 3],
          base64: true
        });

        this.conditionImageState(result)
      } catch (error) {
        console.log(error);
      }
    }
  }

  conditionImageState = result => {
    const { onPickerImage } = this.props;

    if(!result.cancelled) {
      if(onPickerImage) onPickerImage(result);
      this.setState({ image: result.uri, isModalOpen: false });
    }
  };

  get options() {
    const { takePhotoLabel = 'Take a Photo', pickPhotoLabel = 'Pick a Photo' } = this.props;

    return [
      {
        key: 'takePhoto',
        label: takePhotoLabel,
        id: 0,
        fn: async () => {
          this.setState({
            isModalOpen: false,
            selectedAction: this._takePhoto
          });
          if (Platform.OS === 'android') {
            await this._takePhoto();
          }
      }},
      {
        key: 'galleryPhoto',
        label: pickPhotoLabel,
        id: 1,
        fn: async () => {
          this.setState({
            isModalOpen: false,
            selectedAction: this._pickPhoto
          });
          if (Platform.OS === 'android') {
            await this._pickPhoto();
          }
      }},
    ]
  }

  render () {
    const { image, isModalOpen } = this.state;
    const { width, height, cancelLabel, children = null, iconPhoto = false, style } = this.props;

    let sizeProps;
    if(width && height) {
      sizeProps = {
        width, height
      };
    }

    const IcoPhoto = iconPhoto && (
      <IconContent {...sizeProps}>
        <IconPhoto
          name='md-camera'
          size={15}
        />
      </IconContent>
    );

    return (
      <Preview
        children={children}
        {...sizeProps}
        onPress={() => this._setModalVisible(true)}>
        <Container style={style}>
          {children}
          {!children && image && (
            <ImagePreview source={{uri: image}} {...sizeProps}>
              {IcoPhoto}
            </ImagePreview>
          )}
          {IcoPhoto}
        </Container>
        <ModalOptions
          isOpen={isModalOpen}
          options={this.options}
          cancelLabel={cancelLabel}
          onCloseRequest={() => this._setModalVisible(false)}
          onDismiss={async () => {
            const {selectedAction} = this.state
            if (selectedAction) {
              await selectedAction();
            }
          }}
        />
      </Preview>
    )
  }
}

PhotoPicker.propTypes = {
  onPickerImage: PropTypes.func,
  cancelLabel: PropTypes.oneOfType([ PropTypes.node, PropTypes.string ]),
  width: PropTypes.string,
  height: PropTypes.string,
  children: PropTypes.node,
  iconPhoto: PropTypes.bool,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
}