import React from 'react'
import { View, Text } from 'react-native'
import styled from 'styled-components/native'

const Container = styled(View)`
  border-radius: 10px;
  padding: 5px;
  background-color: ${props => props.receiver ? '#dbdeb9' : '#2d90c3'};
`

const ChatBubble = ({ children }) => {
  return (
    <Container>
      <Text>{children}</Text>
    </Container>
  )
}

export default ChatBubble
