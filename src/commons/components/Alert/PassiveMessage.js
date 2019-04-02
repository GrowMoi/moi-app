import React, { Component } from 'react'
import { View, Image } from 'react-native'
import { LinearGradient } from 'expo'
import styled, { css } from 'styled-components/native'
import { TextBody, Header, Title } from '../Typography'
import yellow_pattern from '../../../../assets/images/miscelaneous/yellow_pattern.png'
import * as Animatable from 'react-native-animatable';

const Container = styled(View)`
  flex: 1;
  width: 70%;
  min-height: 50px;
  overflow: hidden;
  position: absolute;
  padding-bottom: 38px;
  padding-top: 38px;
  ${props => {
    switch(props.position) {
      case 'bottom':
        return css`
          bottom: 0;
        `;
      case 'top':
        return css`
          top: 0;
        `;
      case 'bottomRight':
        return css`
          bottom: 0;
          right: 0;
        `;
      case 'bottomLeft':
        return css`
          bottom: 0;
          left: 0;
        `;
      case 'topLeft':
        return css`
          top: 0;
          left: 0;
        `;
      case 'topRight':
        return css`
          top: 0;
          right: 0;
        `;
      default:
        return css`
          bottom: 0;
        `
    }
  }}
`

const Background = styled(LinearGradient)`
  flex: 1;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
`

const Shining = styled(View)`
  position: absolute;
  top: 0;
  left: 0;
  height: 3;
  backgroundColor: white;
  width: 100%;
  opacity: 0.5;
`

const Shadow = styled(View)`
  position: absolute;
  bottom: 0;
  height: 5;
  backgroundColor: #ce7903;
  width: 100%;
`

const Content = styled(View)`
  position: relative;
  height: 100%;
  width: 100%;
  border-radius: 10;
  border-color: #614c16;
  border-width: 2;
  overflow: hidden;
`

const Pattern = styled(Image)`
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0.9;
  width: 100%;
  height: 100%;
`
const TextContainer = styled(View)`
  padding-horizontal: 8;
  padding-vertical: 17;
`

const AnimatableView = styled(View)`
`

const AnimatableContent = Animatable.createAnimatableComponent(AnimatableView);

export default class PassiveMessage extends Component {
  render() {
    const { position='bottomLeft', children } = this.props

    return (
      <Container position={position} style={this.props.style}>
        <AnimatableContent animation="fadeIn" easing="ease-in-out">
          <Content>
            <Background colors={['#f8c570', '#d5a305']} />
            <Pattern source={yellow_pattern} resizeMode='cover'/>
            <TextContainer>
              <Header style={{ color: 'white'}} small bolder>{children}</Header>
            </TextContainer>
            <Shining/>
            <Shadow />
          </Content>
        </AnimatableContent>
      </Container>
    )
  }
}
