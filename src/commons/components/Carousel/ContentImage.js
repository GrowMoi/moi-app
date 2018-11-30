import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, TouchableWithoutFeedback, ImageBackground } from 'react-native';
import styled from 'styled-components/native';
import { FontAwesome } from '@expo/vector-icons'
import Preloader from '../Preloader/Preloader';

const Container = styled(TouchableWithoutFeedback)`
  width: ${props => props.size.width};
  height: ${props => props.size.height};
  overflow: hidden;
`;

const Img = styled(ImageBackground)`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export default class ContentImage extends Component {
  state = {
    loading: true,
  }

  onPress = (imageProps) => {
    const { onPressImage } = this.props;
    if(onPressImage) onPressImage(imageProps);
  }

  render() {
    const { size, onPressImage, data, ...rest } = this.props;

    return (
      <Container size={size} onPress={() => !this.state.loading && this.onPress({ ...rest, data, size })}>
        <Img {...rest} onLoad={() => this.setState({ loading: false })} onError={() => this.setState({ loading: false })}>
          {this.state.loading && <Preloader notFullScreen/>}
          {data.type === 'video' && (
            <FontAwesome
              name="play-circle"
              size={40}
              color={'rgba(255, 255, 255, 0.4)'}
            />)}
        </Img>
      </Container>
    );
  }
}

ContentImage.defaultProps = {
  size: {
    width: 200,
    height: 200,
  },
};

ContentImage.propTypes = {
  size: PropTypes.object,
};
