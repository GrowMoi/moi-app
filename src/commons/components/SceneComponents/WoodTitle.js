import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { Image } from 'react-native';
import { Header } from '../Typography';
import background from '../../../../assets/images/buttons/boton_login.png';
import { getHeightAspectRatio } from '../../utils';

const LoginTitle = styled(Image)`
  width: ${props => props.width};
  height: ${props => getHeightAspectRatio(199, 69, props.width)};
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const WoodTitle = ({ title }) => {
  return (
    <LoginTitle
      source={background}
      width={150}
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

