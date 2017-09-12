import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Image } from 'react-native';
import styled from 'styled-components/native';
import loading from '../../../../assets/images/loading.gif';

const Container = styled(View)`
  width: ${props => props.size.width};
  height: ${props => props.size.height};
  overflow: hidden;
`;

const Img = styled(Image)`
  flex: 1;
`;

const LoadingContainer = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export default class ContentImage extends Component {
  state = {
    loading: true,
  }

  render() {
    const { size, ...rest } = this.props;

    return (
      <Container size={size}>
        <Img {...rest} onLoad={() => this.setState({ loading: false })}>
          {
            this.state.loading && (
              <LoadingContainer>
                <Image style={{ width: 30, height: 30 }} source={loading} resizeMode='contain' />
              </LoadingContainer>
            )
          }
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
