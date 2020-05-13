import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  Modal,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  SectionList,
  Text,
  FlatList,
  Dimensions,
  Platform,
} from 'react-native';
import styled from 'styled-components/native';
import { connect } from 'react-redux';
import _ from 'lodash';
import moment from 'moment';
import * as usersChatActions from '../../../actions/chatActions';
import Button from '../Buttons/Button';
import Preloader from '../Preloader/Preloader';
import ChatBubble from './ChatBubble'
import { TextBody } from '../Typography';
import PusherService from '../../utils/pusherService';

const { width, height } = Dimensions.get('screen');

const MESSAGE_TYPE_USER = 'user';

const Container = styled(View)`
  width: ${width};
  height: ${height};
  background: rgba(0,0,0,0.8);
  align-items: flex-start;
  justify-content: flex-start;
  padding-horizontal: 20px;
  padding-bottom: ${Platform.OS === 'ios' ? '40px' : '20px'};
  padding-top: ${Platform.OS === 'ios' ? '50px' : '20px'};
`

const ChatBox = styled(KeyboardAvoidingView)`
  position: relative;
  width: 100%;
  height: 95%;
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

const BubbleWithTitle = styled(View)`
`

const TitleContainer = styled(View)`
  align-items: center;
  justify-content: center;
  width: 100%;
  flex-direction: row;
  padding: 5px;
  margin-top: 10px;
`;

const SectionTitle = styled(Text)`
  color: #1d6991;
  font-weight: bold;
`

const Line = styled(View)`
  height: 1px;
  flex: 1;
  margin-right: 5px;
  margin-left: 5px;
  background-color: #1d6991;
`

const DayTitle = ({ children }) => {
  return(
    <TitleContainer>
      <Line />
      <SectionTitle>{children}</SectionTitle>
      <Line />
    </TitleContainer>
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
  startChat,
  pushMessage,
}) => {
  const [loading, setLoading] = useState(true)
  const keyMessages = Object.keys(currentChatData.messages);
  const messages = keyMessages.map(id => currentChatData.messages[id])
    .filter(msm => msm.type === MESSAGE_TYPE_USER);

  const isInverted = messages.length > 0;
  const openedFromProfile = currentChatData.openedFromProfile;

  useEffect(() => {
    if(chatIsVisible) {
      const getChatMessages = async () => {
        if(openedFromProfile) {
          await startChat(currentChatData.receiver_id)
        }

        await getMessages({
          receiver_id: currentChatData.receiver_id,
          user_id: currentChatData.user_id,
        })

        setLoading(false);
      }

      getChatMessages()

      const userChatNotificationChannel = {
        channelName: `userchatsnotifications.${currentChatData.user_id}`,
        eventName: 'newmessage',
        action: {
          id: 'ChatModalCb',
          callback: pushMessage
        }
      }

      PusherService.listen(userChatNotificationChannel);
    }
  }, [chatIsVisible])

  const groupsByDate = _.groupBy(messages, function (message) {
    return moment(message.created_at).startOf('day').format();
  })

  const groupMessages = [];
  Object.keys(groupsByDate).forEach(date => {
    const messagesByDate = groupsByDate[date];
    const messagessOfDay = { title: moment(date).format('dddd MMM D'), data: messagesByDate }
    groupMessages.push(messagessOfDay);
  });

  return (
    <Modal
      animationType="fade"
      visible={chatIsVisible}
      transparent={true}
      onDismiss={() => {
        setLoading(true);
      }}
    >
      <Container>
        <ChatBox behavior="height">
          <MessagesBox>
            {messagesIsLoading && <Preloader notFullScreen/>}
            <FlatList
              inverted={isInverted}
              data={groupMessages.reverse()}
              keyExtractor={(item) => `message-${item.title}` }
              ListEmptyComponent={() => {
                if((!messagesIsLoading && messages.length === 0)) {
                  return (
                    <EmptyList>
                      {!loading && <EmptyText>Escribe un mensaje para iniciar una conversación</EmptyText>}
                    </EmptyList>
                  )
                }

                return null
              }}
              renderItem={({ item: items }) => {
                return items.data.map((item, i) => {
                  const waitingToSend = currentMessageState.message.id === item.id && currentMessageState.waiting;
                  if(i === 0) {
                    return (
                      <BubbleWithTitle key={item.id}>
                        <DayTitle>{items.title}</DayTitle>
                        <ChatBubble
                          waiting={waitingToSend}
                          kind={item.kind}
                          key={item.id}
                          date={moment(item.created_at).format('HH:mm')}
                        >
                          {item.message}
                        </ChatBubble>
                      </BubbleWithTitle>
                    )
                  }
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
                }).reverse()
              }}
            />
          </MessagesBox>

          <InputMessage onPressSend={async (message) => {
            sendMessage({
              message,
              receiver_id: currentChatData.receiver_id,
              room_chat_id: currentChatData.room_chat_id || messages[messages.length - 1].room_chat_id,
            })
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
  startChat: usersChatActions.startChat,
  pushMessage: usersChatActions.pushMessage,
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersChatModal);
