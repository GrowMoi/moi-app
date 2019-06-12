import React from 'react'
import { View, ImageBackground, ScrollView } from 'react-native'
import styled, { css } from 'styled-components/native'

// Components
import { Palette } from '../../styles';
import Profile from '../Profile/Profile';
import { Title, TextBody } from '../Typography';
import Button from '../Buttons/Button';

// Utils
import { getHeightAspectRatio } from '../../utils';

const Container = styled(View)`
  width: 300;
  align-items: center;
`;

const Description = styled(View)`
  margin-top: 20;
  ${props => props.marginBottom && css`
    margin-bottom: 20;
  `}
`;

const ContentBox = styled(ScrollView)`
  margin-top: 20;
  background-color: ${Palette.colors.greenFrame};
  width: 100%;
  padding-horizontal: 20;
  padding-vertical: 20;
  border-radius: 5;
  margin-bottom: 10;
  max-height: 450;
`;

const Buttons = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding-horizontal: 20;
`;

const imageWidth = 260;
const Img = styled(ImageBackground)`
  height: ${getHeightAspectRatio(imageWidth, 150, 250)};
  width: ${imageWidth};
  margin-top: 20;
  background-color: white;
`;

export const TutorGenericAlert = ({
  onNext,
  onCancel,
  message = '',
  nextText = 'Aceptar',
  cancelText='Cancelar',
  description='',
  media = '',
}) => {

  return (
    <Container>
      <ContentBox>
        <Title center book color='white'>{message}</Title>
        <Description marginBottom={!!media}>
          {description && <TextBody inverted center>{description}</TextBody>}
        </Description>
        {media && (
          <Img source={{ uri: media }} resizeMode='contain' />
        )}
      </ContentBox>

      <Buttons>
        <View style={{ width: '45%' }}>
          {(onNext && typeof onNext === 'function') && <Button style={{ width: '100%' }} title={nextText} onPress={onNext} />}
        </View>
        <View style={{ width: '45%' }}>
          {(onCancel && typeof onCancel === 'function') && <Button style={{ width: '100%' }} title={cancelText} onPress={onCancel}/>}
        </View>
      </Buttons>
    </Container>
  )
};

export default TutorGenericAlert;
