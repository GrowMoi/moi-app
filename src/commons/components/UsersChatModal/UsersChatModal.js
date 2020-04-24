import React, { useState, useEffect, useCallback } from 'react';
import { Modal, View, Image, TouchableOpacity, TextInput, KeyboardAvoidingView, Text } from 'react-native';
import styled from 'styled-components/native';
// import button_close_img from '../../../../assets/images/miscelaneous/button_close.png'
import { connect } from 'react-redux';
import * as usersChatActions from '../../../actions/chatActions'
import Button from '../Buttons/Button';
import Preloader from '../Preloader/Preloader';
import ChatBubble from './ChatBubble'

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

const ChatList = () => {
  // TODO: create a chat list component with flat list.
  return null;
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
  const getChatMessages = useCallback(
    () => {
      getMessages({
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
            {!messagesIsLoading && Object.keys(currentChatData.messages).map((messageId) => {
              const message = currentChatData.messages[messageId];
              const waitingToSend = currentMessageState.message.id === messageId && currentMessageState.waiting;
              return (
                <ChatBubble
                  waiting={waitingToSend}
                  kind={message.kind}
                  key={message.id}
                >
                  {message.message}
                </ChatBubble>
              )
            })}
          </MessagesBox>

          <InputMessage onPressSend={(message) => { sendMessage({ message, receiver_id: currentChatData.receiver_id }) }} />
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