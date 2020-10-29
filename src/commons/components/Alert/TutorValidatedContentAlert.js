import React from 'react'
import { View, ScrollView } from 'react-native'
import styled from 'styled-components/native'

// Components
import { Title, TextBody } from '../Typography';
import Button from '../Buttons/Button';
import CloseIcon from '../../../containers/Events/CloseIcon';
import ContentContainer from '../../../containers/Events/ContentContainer';

const Container = styled(View)`
  width: 325;
  align-items: center;
`;

const Description = styled(View)`
  margin-top: 20;
`;

const ContentBox = styled(ScrollView)`
  padding-horizontal: 20;
  padding-vertical: 20;
  border-radius: 5;
`;

const Buttons = styled(View)`
  margin-top: 10;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding-horizontal: 20;
`;

const colorsMargin = ['#344F39', '#344F39'];
const colorsContent = ['#74AD50', '#74AD50'];

export const TutorValidatedContentAlert = ({
  onCancel,
  onNext,
  cancelText = 'Cancelar',
  nextText = 'Intentar nuevamente',
  data: {
    approved = false,
    message = '',
    content_title: contentTitle = '',
  }
}) => {

  return (
    <Container>
      <CloseIcon onPress={onCancel} style={{ top: -10 }} />
      <ContentContainer width={300} height={approved ? 300 : 400} colorsMargin={colorsMargin} colorsContent={colorsContent}>
        <ContentBox>
          <Title center book color='white'>
            {approved ? `¡Bien hecho! Tu respuesta a ${contentTitle} fue aprobada por tu tutor` :
              'Gracias por subir una respuesta. Lamentablemente, no cumplió con los requisitos mínimos para ser aprobada.'}
          </Title>
          {!approved && <Description>
            {message && <TextBody inverted center>{`Nota: ${message}`}</TextBody>}
          </Description>}
        </ContentBox>
      </ContentContainer>

      <Buttons>
        {!approved && <View style={{ width: '45%' }}>
          {(onNext && typeof onNext === 'function') && <Button style={{ width: '100%' }} title={nextText} onPress={onNext} />}
        </View>}
        <View style={{ width: '45%' }}>
          {(onCancel && typeof onCancel === 'function') && <Button style={{ width: '100%' }} title={cancelText} onPress={onCancel} />}
        </View>
      </Buttons>
    </Container>
  )
};

export default TutorValidatedContentAlert;
