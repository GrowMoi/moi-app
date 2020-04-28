import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Modal, View, Image, TouchableOpacity, TextInput, KeyboardAvoidingView, FlatList } from 'react-native';
import styled from 'styled-components/native';
import { connect } from 'react-redux';
import moment from 'moment'
import * as usersChatActions from '../../../actions/chatActions'
import Button from '../Buttons/Button';
import Preloader from '../Preloader/Preloader';
import ChatBubble from './ChatBubble'
import { TextBody } from '../Typography'

const Container = styled(View)`
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.8);
  align-items: flex-start;
  justify-content: flex-start;
  padding-horizontal: 20px;
  padding-bottom: 40px;
  padding-top: 50px;
`

const ChatBox = styled(KeyboardAvoidingView)`
  position: relative;
  width: 100%;
  height: 100%;
  background-color: rgba(57, 175, 242, 0.5);
  border-color: #1d61a1;
  border-width: 10px;
  border-radius: 20px;
  align-items: center;
  justify-content: center;
  padding-horizontal: 10px;
  padding-vertical: 12px;
`

const ButtonImage = styled(Image)`
  width: 100%;
  height: 100%;
`

const MessagesBox = styled(View)`
  background-color: rgb(57, 175, 242);
  flex: 1;
  width: 100%;
  border-radius: 6px;
  border-bottom-right-radius: 30px;
  border-top-left-radius: 30px;
  margin-bottom: 10px;
  padding: 10px;
`

const BottomMessage = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  position: relative;
`

const InputBox = styled(TextInput)`
  padding-horizontal: 5px;
  height: 45px;
  margin-right: 10px;
  font-size: 16px;
  flex: 1;
  background-color: rgb(57, 175, 242);
  border-radius: 2px;
  color: white;
`

const EmptyList = styled(View)`
  align-items: center;
`
const EmptyText = styled(TextBody)`
  text-align: center;
  color: white;
`

const CloseButton = ({ onPress = () => null, style }) => {
  return (
    <TouchableOpacity style={style} onPress={onPress}>
      <ButtonImage source={{uri: 'button_close'}} />
    </TouchableOpacity>
  )
}

const StyledCloseButton = styled(CloseButton)`
  position: absolute;
  top: -22.5px;
  right: -22.5px;
  height: 45px;
  width: 45px;
  align-items: center;
  justify-content: center;
`

const InputMessage = ({ onPressSend }) => {
  const [message, setMessage] = useState('')

  return (
    <BottomMessage>
      <InputBox
        value={message}
        onChangeText={(txt) => { setMessage(txt) }}
      />
      <Button
        onPress={() => {
          if(message) {
            onPressSend(message);
            setMessage('')
          }
        }}
        title="Enviar"
      />
    </BottomMessage>
  )
}

const UsersChatModal = ({
  hiddenChatModal,
  chatIsVisible,
  currentChatData,
  getMessages,
  sendMessage,
  messagesIsLoading,
  currentMessageState,
}) => {
  const refList = useRef(null)

  const getChatMessages = useCallback(
    async () => {
      return await getMessages({
        receiver_id: currentChatData.receiver_id,
        user_id: currentChatData.user_id,
      })
    },
    [currentChatData.receiver_id, currentChatData.user_id]
  );

  useEffect(() => {
    if(chatIsVisible) {
      getChatMessages();
    }
  }, [chatIsVisible])

  const keyMessages = Object.keys(currentChatData.messages);
  const isInverted = keyMessages.length > 0;
  return (
    <Modal
      animationType="fade"
      visible={chatIsVisible}
      transparent={true}
    >
      <Container>
        <ChatBox behavior="height">
          <MessagesBox>
            {messagesIsLoading && <Preloader notFullScreen/>}
            <FlatList
              inverted={isInverted}
              ref={refList}
              data={(
                keyMessages
                  .map(id => currentChatData.messages[id])
                  .reverse()
              )}
              keyExtractor={(item) => `message-${item.id}` }
              ListEmptyComponent={() => {
                if(!messagesIsLoading) {
                  return (
                    <EmptyList>
                      <EmptyText>Escribe un mensaje para iniciar una conversación</EmptyText>
                    </EmptyList>
                  )
                }

                return null
              }}
              renderItem={({ item }) => {
                const waitingToSend = currentMessageState.message.id === item.id && currentMessageState.waiting;

                return (
                  <ChatBubble
                    waiting={waitingToSend}
                    kind={item.kind}
                    key={item.id}
                    date={moment(item.created_at).format('HH:mm')}
                  >
                    {item.message}
                  </ChatBubble>
                )
              }}
            />
          </MessagesBox>

          <InputMessage onPressSend={async (message) => {
            sendMessage({ message, receiver_id: currentChatData.receiver_id })
          }} />
          <StyledCloseButton onPress={hiddenChatModal} />
        </ChatBox>
      </Container>
    </Modal>
  )
}


const mapStateToProps = (state) => {
  return {
    chatIsVisible: state.usersChat.chat.chatIsVisible,
    currentChatData: state.usersChat.chat.current,
    messagesIsLoading: state.usersChat.chat.loading,
    error: state.usersChat.chat.error,
    currentMessageState: state.usersChat.currentMessageState,
  }
}

const mapDispatchToProps = {
  hiddenChatModal: usersChatActions.hiddenChatModal,
  getMessages: usersChatActions.getMessages,
  sendMessage: usersChatActions.sendMessage,
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersChatModal);