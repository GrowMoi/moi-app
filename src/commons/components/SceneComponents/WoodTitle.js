import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { ImageBackground } from 'react-native';
import { Header } from '../Typography';
import { getHeightAspectRatio } from '../../utils';
import { Size } from '../../styles';

const LoginTitle = styled(ImageBackground)`
  width: ${props => props.width};
  height: ${props => getHeightAspectRatio(199, 69, props.width)};
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const WoodTitle = ({ title }) => {
  return (
    <LoginTitle
      source={{uri: 'boton_login'}}
      width={Size.buttonWidth + 20}
    >
      <Header
        ellipsizeMode='tail'
        numberOfLines={1}
        heavy
        color={'#713223'}
      >
        {title}
      </Header>
    </LoginTitle>
  );
};

WoodTitle.propTypes = {
  title: PropTypes.string,
};

export default WoodTitle;

