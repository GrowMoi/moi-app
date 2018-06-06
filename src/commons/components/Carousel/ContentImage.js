import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, ImageBackground } from 'react-native';
import styled from 'styled-components/native';
import Preloader from '../Preloader/Preloader';

const Container = styled(View)`
  width: ${props => props.size.width};
  height: ${props => props.size.height};
  overflow: hidden;
`;

const Img = styled(ImageBackground)`
  flex: 1;
`;

export default class ContentImage extends Component {
  state = {
    loading: true,
  }

  render() {
    const { size, ...rest } = this.props;

    return (
      <Container size={size}>
        <Img {...rest} onLoad={() => this.setState({ loading: false })} onError={() => this.setState({ loading: false })}>
          {this.state.loading && <Preloader notFullScreen/>}
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
