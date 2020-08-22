import React from 'react'
import { View } from 'react-native'
import styled from 'styled-components/native'

// Components
import { Palette } from '../../styles';
import ProfileAvatar from '../Profile/Profile';
import { Title, TextBody } from '../Typography';
import Button from '../Buttons/Button';

const Container = styled(View)`
  width: 300;
  align-items: center;
`;

const Description = styled(View)`
  margin-top: 20;
`;

const ContentBox = styled(View)`
  margin-top: 20;
  background-color: ${Palette.colors.greenGlow.css()};
  width: 100%;
  padding-horizontal: 20;
  padding-vertical: 20;
  border-radius: 5;
  margin-bottom: 10;
`;

const Buttons = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding-horizontal: 20;
`;

export const TutorQuizAlert = ({
  onNext = () => null,
  onCancel = () => null,
  message = '',
  nextText = 'Ir a la prueba',
  cancelText='Cancelar',
  description='',
}) => {

  return (
    <Container>
      <ProfileAvatar width={80} />
      <ContentBox>
        <Title center book color='white'>{message}</Title>
        <Description>
          {description && <TextBody inverted center>{description}</TextBody>}
        </Description>
      </ContentBox>

      <Buttons>
        <Button style={{ width: '45%' }} title={nextText} onPress={onNext} />
        <Button style={{ width: '45%' }} title={cancelText} onPress={onCancel}/>
      </Buttons>
    </Container>
  )
};

export default TutorQuizAlert;
