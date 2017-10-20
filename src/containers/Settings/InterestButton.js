import React from 'react';
import styled from 'styled-components/native';
import { View, Image } from 'react-native';
import { Description } from '../../commons/components/Typography';
import sportButton from '../../../assets/images/settings/sport_button.png';
import { getHeightAspectRatio } from '../../commons/utils';

const ContainerButton = styled(View)`
  align-items: center;
  justify-content: center;
  flex-flow: row nowrap;
`;

const width = 53;
const height = 49;

const IButton = styled(Image)`
  width: ${props => props.width};
  height: ${props => getHeightAspectRatio(width, height, props.width)};
  margin-right: 5;
`;

const Title = styled(View)`
  background-color: #5a7230;
  padding-horizontal: 10;
`;

// TODO: complete de component in other version of moi
const InterestButton = ({ title, type }) => {

  let source;
  switch (type) {
    case 'sport':
      source = sportButton;
      break;
    default:
      break;
  }

  return (
    <ContainerButton>
      <Title>
        <Description color='#f4f095'>{title || 'Title'}</Description>
      </Title>
      <IButton width={40} source={source} resizeMode='contain' />
    </ContainerButton>
  );
};

export default InterestButton;
