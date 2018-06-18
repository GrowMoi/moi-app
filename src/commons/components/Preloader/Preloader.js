import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Image, Modal } from 'react-native';
import styled from 'styled-components/native';

import { Palette } from '../../styles'
import loadingGif from '../../../../assets/images/loading.gif';

const PreloaderContainer = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${Palette.dark.alpha(0.2).css()};
`;

const Loader = styled(Image)`
  width: ${props => props.size};
  height: ${props => props.size};
`;

class Preloader extends Component {
  state = {
    modalIsVisible: true
  }

  componentWillUnmount() {
    this.setState({ modalIsVisible: false });
  }

  render() {
    const { modalIsVisible, size, notFullScreen } = this.props;

    const loader = (
      <PreloaderContainer>
        <Loader
          size={size}
          source={loadingGif}
        />
      </PreloaderContainer>
    );

    if(notFullScreen) return loader;
    return (
      <PreloaderContainer>
        <Modal
          animationType='fade'
          transparent={true}
          visible={modalIsVisible}
          supportedOrientations={['portrait', 'landscape']}
        >
          {loader}
        </Modal>
      </PreloaderContainer>
    );
  }
}

Preloader.propTypes = {
  size: PropTypes.number,
  notFullScreen: PropTypes.bool,
};

Preloader.defaultProps = {
  size: 40,
};

export default Preloader;
