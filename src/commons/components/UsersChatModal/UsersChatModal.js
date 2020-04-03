import React, { useState } from 'react';
import { Modal, View, Image, TouchableOpacity, TextInput, KeyboardAvoidingView } from 'react-native';
import styled from 'styled-components/native';
// import button_close_img from '../../../../assets/images/miscelaneous/button_close.png'
import { connect } from 'react-redux';
import * as usersChatActions from '../../../actions/chatActions'
import Constants from 'expo-constants'
import Button from '../Buttons/Button';

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
      <InputBox onChangeText={(txt) => { setMessage(txt) }}/>
      <Button onPress={() => { if(message) onPressSend(message) }} title="Enviar"/>
    </BottomMessage>
  )
}

const UsersChatModal = ({ hiddenChatModal, chatIsVisible }) => {
  return (
    <Modal
      animationType="fade"
      visible={chatIsVisible}
      transparent={true}
    >
      <Container>
        <ChatBox behavior="height">
          <MessagesBox>


          </MessagesBox>

          <InputMessage onPressSend={(message) => { console.log('Send Message', message) }} />

          <StyledCloseButton onPress={hiddenChatModal} />
        </ChatBox>
      </Container>
    </Modal>
  )
}


const mapStateToProps = (state) => {
  return {
    chatIsVisible: state.usersChat.chat.chatIsVisible,
  }
}

const mapDispatchToProps = {
  hiddenChatModal: usersChatActions.hiddenChatModal,
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersChatModal);