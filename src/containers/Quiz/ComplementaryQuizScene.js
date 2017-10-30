import React from 'react';
import { View, Image } from 'react-native';
import styled from 'styled-components/native';
import { getHeightAspectRatio } from '../../commons/utils';
import iconTest from '../../../assets/images/quiz/icon_test.png';
import { Palette } from '../../commons/styles';
import Button from '../../commons/components/Buttons/Button';
import { Title } from '../../commons/components/Typography';

const IntroScene = styled(View)`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const iconWidth = 279;
const iconHeight = 97;
const IconTest = styled(Image)`
  width: ${({ width }) => width};
  height: ${({ width }) => getHeightAspectRatio(iconWidth, iconHeight, width)};
`;

const MessageContainer = styled(View)`
  align-items: center;
  width: 250;
  margin-vertical: 10;
`;

const MessageBox = styled(View)`
  background-color: white;
  padding-horizontal: 20;
  padding-vertical: 40;
  align-self: stretch;
  shadow-offset: 3px 3px;
  shadow-opacity: 0.3;
  shadow-radius: 2;
  border-radius: 3;
`;

const Container = styled(View)`
  margin-vertical: 10;
  align-self: stretch;
`;

const ContainerButton = Container.extend`
  align-items: flex-end;
`;


const ComplementaryScene = ({ title = '', text = '', onNext }) => {
  const onNextClick = () => {
    if (onNext) onNext();
  };

  return (
    <IntroScene>
      <IconTest width={200} source={iconTest} resizeMode='contain'/>

      <MessageContainer>
        <Container>
          <Title center book color='white'>{title}</Title>
        </Container>
        <MessageBox>
          <Title center heavy color={Palette.menuBackground}>{text}</Title>
        </MessageBox>
      </MessageContainer>

      <ContainerButton>
        <Button onPress={onNextClick} title='Siguiente' />
      </ContainerButton>
    </IntroScene>
  );
};

export default ComplementaryScene;
