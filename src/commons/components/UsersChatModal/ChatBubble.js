import React from 'react'
import { View, Text } from 'react-native'
import styled, { css } from 'styled-components/native'
import { EvilIcons, AntDesign } from '@expo/vector-icons'

const KIND_INCOMING_MESSAGE = 'incoming';
const KIND_OUT_MESSAGE = 'outgoing';

const Container = styled(View)`
  display: flex;
  justify-content: flex-start;
  overflow: hidden;
  margin-bottom: 5px;
  position: relative;
  ${props => {
    if(props.kind === KIND_INCOMING_MESSAGE) {
      return css`align-items: flex-start;`
    }
    return css`
      align-items: flex-end;
    `
  }}
`

const Message = styled(Text)`
  color: white;
  padding: 10px;
  padding-bottom: 15px;
  max-width: 80%;
  background-color: ${props => props.kind === KIND_INCOMING_MESSAGE ? '#1e61a1' : '#2d90c3'};
  border-radius: 10px;
  overflow: hidden;
  ${props => {
    if(props.kind === KIND_INCOMING_MESSAGE) {
      return css`text-align: right;`
    }
    return css`text-align: left;`
  }}
`

const WaitingIcon = styled(EvilIcons)`
  position: absolute;
  bottom: 1px;
  right: 0;
  color: white;
`

const CheckIcon = styled(AntDesign)`
  position: absolute;
  bottom: 2px;
  right: 0;
  color: white;
`

const ChatBubble = ({ children, kind, waiting }) => {
  return (
    <Container kind={kind}>
      <Message kind={kind}>{children}</Message>
      {kind === KIND_OUT_MESSAGE && (
        waiting ? <WaitingIcon name='clock' /> : <CheckIcon name='check' />
      )}
    </Container>
  )
}

export default ChatBubble
