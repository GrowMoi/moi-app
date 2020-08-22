import React from 'react';
import styled from 'styled-components/native';
import { View } from 'react-native';
import { Description, TextBody } from '../../commons/components/Typography';

const HeaderContainer = styled(View)`
  flex-flow: row nowrap;
  background-color: #839c55;
  height: 20;
  width: 190;
  align-self: flex-end;
  border-radius: 5;
  margin-bottom: 10;
  padding-horizontal: 5;
  align-items: center;
  justify-content: space-between;
`;

const TextLevelsWrapper = styled(View)`
  width: 100;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;
  padding-horizontal: 5;
`;

const HeaderLevels = () => {
  return (
    <HeaderContainer>
      <Description heavy>Level</Description>
      <TextLevelsWrapper>
        <TextBody heavy small>1</TextBody>
        <TextBody heavy small>2</TextBody>
        <TextBody heavy small>3</TextBody>
      </TextLevelsWrapper>
    </HeaderContainer>
  );
};

export default HeaderLevels;
