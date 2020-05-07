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
  padding-vertical: 10px;
  padding-horizontal: 15px;
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
  ${props => {
    if(props.waiting) {
      return css`opacity: 0.5;`
    }
  }}
`

const WaitingIcon = styled(EvilIcons)`
  color: white;
`

const Footer = styled(View)`
  position: absolute;
  bottom: 2px;
  flex-direction: row;
  ${props => {
    if(props.kind === KIND_INCOMING_MESSAGE) {
      return css`
        left: 6;
      `
    } else {
      return css`
        right: 3;
      `
    }
  }}
`

const CheckIcon = styled(AntDesign)`
  color: white;
`

const DateText = styled(Text)`
  font-size: 8px;
  color: white;
`

const ChatBubble = ({ children, kind, waiting, date }) => {
  return (
    <Container kind={kind}>
      <Message kind={kind} waiting={waiting}>{children}</Message>
      <Footer kind={kind}>
        {date && <DateText>{date}</DateText>}
        {kind === KIND_OUT_MESSAGE && (
          waiting ? <WaitingIcon name='clock' size={8}/> : <CheckIcon name='check' size={8}/>
        )}
      </Footer>
    </Container>
  )
}

export default ChatBubble
