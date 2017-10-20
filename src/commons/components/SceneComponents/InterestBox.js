import React from 'react';
import PropTypes from 'prop-types';
import { Image } from 'react-native';
import styled from 'styled-components/native';
import { getHeightAspectRatio } from '../../utils';
import { Palette } from '../../styles';
import interestBox from '../../../../assets/images/settings/box_interests.png';

const width = 540;
const height = 340;
const Background = styled(Image)`
  width: ${props => props.width};
  height: ${props => getHeightAspectRatio(width, height, props.width)};
  padding-horizontal: 10;
  padding-vertical: 10;
  align-items: center;
  shadow-color: ${Palette.dark};
  shadow-opacity: 1;
  shadow-offset: 0 5px;
  shadow-radius: 2;
  justify-content: center;
  overflow: visible;
`;

const InterestBox = ({ children, ...rest }) => (
  <Background
    source={interestBox}
    resizeMode='contain'
    {...rest}
  >
    {children}
  </Background>
);

InterestBox.propTypes = {
  children: PropTypes.any,
};

InterestBox.defaultProps = {
  width: 260,
};

export default InterestBox;
