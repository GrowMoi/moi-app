import React from 'react'
import { View, WebView, ImageBackground, ScrollView } from 'react-native'
import styled, { css } from 'styled-components/native'

// Components
import { Palette } from '../../styles';
import Profile from '../Profile/Profile';
import { Title, TextBody } from '../Typography';
import Button from '../Buttons/Button';

// Utils
import { youtube, getHeightAspectRatio } from '../../utils';

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
`;

const Buttons = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding-horizontal: 20;
`;

const Video = styled(View)`
  height: 148;
`;

const imageWidth = 260;
const Img = styled(ImageBackground)`
  height: ${getHeightAspectRatio(imageWidth, 150, 250)};
  width: ${imageWidth};
  margin-top: 20;
  background-color: white;
`;

const makeHTLM = (url = '') => {
  const id = youtube.extractIdFromUrl(url);

  return (`
    <style>
      .video {
        position: relative;
        padding-bottom: 56.25%;
      }
      iframe {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        width: 100%;
        height: 100%;
      }
    </style>
    <div class='video'>
      <iframe width="560" height="315" src="https://www.youtube.com/embed/${id}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
    </div>
  `);
}

export const TutorGenericAlert = ({
  onNext,
  onCancel,
  message = '',
  nextText = 'Aceptar',
  cancelText='Cancelar',
  description='',
  video = '',
  media = '',
}) => {

  return (
    <Container>
      <ContentBox>
        <Title center book color='white'>{message}</Title>
        <Description marginBottom={!!(video || media)}>
          {description && <TextBody inverted center>{description}</TextBody>}
        </Description>
        {video && (
          <Video>
            <WebView
              scrollEnabled={false}
              style={{ backgroundColor: 'transparent' }}
              source={{ html: makeHTLM(video) }}
            />
          </Video>
        )}
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
