import React from 'react';
import {
  View,
} from 'react-native';
import { Ionicons  } from '@expo/vector-icons';
import styled from 'styled-components/native';
import { Palette } from '../../commons/styles';
import { TextBody } from '../../commons/components/Typography';

const Container = styled(View)`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const InfoIcon = styled(Ionicons)`
  background-color: transparent;
  color: ${Palette.dark};
`;

const EmptyState = ({ text, iconName='md-information-circle', children }) => {
  if(children) {
    return (
      <Container>
        {children}
     </Container>
    )
  }

  return (
    <Container>
      <InfoIcon name={iconName} size={30} />
      <TextBody center>{text}</TextBody>
    </Container>
  )
}

export default EmptyState;
