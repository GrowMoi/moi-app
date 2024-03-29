import React from 'react'
import { View } from 'react-native'
import styled from 'styled-components/native'

// Components
import { Palette } from '../../styles';
import Profile from '../Profile/Profile';
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

const ContentBox = styled(View)`
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

export const GenericAlert = ({
  onNext,
  onCancel,
  message = '',
  nextText = 'Aceptar',
  cancelText = 'Cancelar',
  description = '',
}) => {

  return (
    <Container>
      <CloseIcon onPress={onCancel} style={{ top: -10 }} />
      <ContentContainer width={300} colorsMargin={colorsMargin} colorsContent={colorsContent}>
        <ContentBox>
          <Title center book color='white'>{message}</Title>
          <Description>
            {description && <TextBody inverted center>{description}</TextBody>}
          </Description>
        </ContentBox>
      </ContentContainer>

      <Buttons>
        <View style={{ width: '45%' }}>
          {(onNext && typeof onNext === 'function') && <Button style={{ width: '100%' }} title={nextText} onPress={onNext} />}
        </View>
        <View style={{ width: '45%' }}>
          {(onCancel && typeof onCancel === 'function') && <Button style={{ width: '100%' }} title={cancelText} onPress={onCancel} />}
        </View>
      </Buttons>
    </Container>
  )
};

export default GenericAlert;
