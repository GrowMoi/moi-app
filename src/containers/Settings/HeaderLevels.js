import React from 'react';
import styled from 'styled-components/native';
import { View } from 'react-native';
import { Palette } from '../../commons/styles';
import { Description, TextBody } from '../../commons/components/Typography';

const HeaderContainer = styled(View)`
  flex-flow: row nowrap;
  background-color: ${Palette.colors.lightenDarkBlue};
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
      <Description heavy inverted>Level</Description>
      <TextLevelsWrapper>
        <TextBody heavy small inverted>1</TextBody>
        <TextBody heavy small inverted>2</TextBody>
        <TextBody heavy small inverted>3</TextBody>
      </TextLevelsWrapper>
    </HeaderContainer>
  );
};

export default HeaderLevels;
