import React from 'react'
import { View, ImageBackground, ScrollView, Linking } from 'react-native'
import styled, { css } from 'styled-components/native'

// Components
import { Palette } from '../../styles';
import Profile from '../Profile/Profile';
import { Title, TextBody } from '../Typography';
import Button from '../Buttons/Button';

// Utils
import { getHeightAspectRatio } from '../../utils';
import Carousel from '../Carousel/Carousel';

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

const VideoContainer = styled(View)`
  padding-vertical: 10;
  background-color: #035faf;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  margin-bottom: 10;
  margin-top: 5;
`

export const TutorGenericAlert = ({
  onNext,
  onCancel,
  message = '',
  nextText = 'Aceptar',
  cancelText='Cancelar',
  description='',
  media = '',
  videoUrl = ''
}) => {

  return (
    <Container>
      <ContentBox>
        <Title center book color='white'>{message}</Title>
        <Description marginBottom={!!media.length}>
          {description && <TextBody inverted center>{description}</TextBody>}
        </Description>
        {!!videoUrl && <VideoContainer>
          <TextBody
          style={{ color: 'white' }}
          onPress={() => {
            if(videoUrl) {
              Linking.canOpenURL(videoUrl).then(supported => {
                supported && Linking.openURL(videoUrl);
              }, (err) => console.log(err));
            }
          }}>Abrir link a video</TextBody>
        </VideoContainer>}
        {((media || []).length > 0) && <Carousel
          showsPagination
          loop
          autoplay
          resizeMode='contain'
          size={{ width: '100%', height: 150 }}
          images={media}
        />}
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
