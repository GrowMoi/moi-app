import React, { PureComponent } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import ItemTasks from './ItemTasks';
import SubItemRow from './SubItemRow';
import { TextBody } from '../../../commons/components/Typography';
import { Palette, Size } from './../../../commons/styles';
import uuid from 'uuid/v4';
import { connect } from 'react-redux';
import Badge from '../../../commons/components/Badge/Badge';
import eventsUtils from '../../Events/events-utils';

// Actions
import userActions from '../../../actions/userActions';
import * as userChatActions from '../../../actions/chatActions'

const NOTIFICATION_TYPE_USER_CHAT = 'user_chat';

class NotificationTabContainer extends PureComponent {
  state = {
    open: false,
    isLoading: false,
  }

  openContainer = () => {
    this.setState(prevState => ({ open: !prevState.open }));
  }

  _keyExtractor = (item, index) => uuid();

  onCloseNotification = async (item) => {
    const { readNotificationAsync, deleteNotification, leaveChat } = this.props;

    if(item.type === NOTIFICATION_TYPE_USER_CHAT) {
      try {
        await leaveChat(item.id);
        deleteNotification(item.id);
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const { data = {} } = await readNotificationAsync(item.id);
        if (data.deleted) {
          deleteNotification(item.id);
        }

      } catch (error) {
        console.log(error);
      }
    }
  }

  handleLoadMore = async () => {
    const { loadMoreNotificationsAsync } = this.props;
    try {
      await loadMoreNotificationsAsync();
    } catch (error) {
      console.log(error);
    }
  }

  renderBadge() {
    const { notificationDetails: { notifications: totalNotifications } } = this.props;
    if (totalNotifications === 0) return null;

    return (
      <View style={{ position: 'absolute', zIndex: 8, top: -8, right:  Size.paddingRightBadge}}>
        <Badge value={totalNotifications}
          size={Size.badgeTaskSize} />
      </View>
    );
  }

  isEvent = item => {
    return Array.isArray(item);
  }

  isChat = item => {
    return item.type === 'user_chat';
  }

  isSuperEvent = item => {
    return item[0] === 'super_event';
  }

  _renderItem = ({ item }) => {
    const { onClickItem = () => null, showChatModal } = this.props;

    const isEvent = this.isEvent(item);
    const isChat = this.isChat(item);

    let title;
    let description;

    if (isEvent) {
      title = this.isSuperEvent(item) ? 'Super Evento' : 'Eventos';
      description = this.isSuperEvent(item) ? '' : `(${item[0]})`;
    } else if (isChat) {
      const chatData = item.chat || {};
      const receiverName = chatData.chat_with;
      title = `Chat con ${receiverName}`;
      const lastSender = (chatData.kind === 'outgoing') ? 'Yo' : `${receiverName}`;
      const lastMessage = chatData.message;
      description = `${lastSender}: ${lastMessage}`;
    } else {
      title = item.title;
      description = item.description;
    }

    return (
      <SubItemRow
        descriptionInverted
        title={title}
        clickClose={isEvent ? null : () => this.onCloseNotification(item)}
        onPress={() => {
          if(item.type === NOTIFICATION_TYPE_USER_CHAT) {
            showChatModal({
              receiver_id: item.chat.receiver_id,
              user_id: item.chat.sender_id,
            })
          } else {
            onClickItem(isEvent ? item[1] : item)
          }
        }}
        description={description}
      />
    );
  }

  get events() {
    const { events } = this.props;
    return eventsUtils.filterValidEvents(events);
  }

  render() {
    const { title, icon, data } = this.props;
    const { open } = this.state;

    return (
      <View style={styles.tasks}>
        {this.renderBadge()}
        <ItemTasks onPress={this.openContainer} title={title} icon={icon} />
        {open && (
          <View style={styles.subItemContainer}>
            <FlatList
              data={[...data.notifications, ...this.events]}
              keyExtractor={this._keyExtractor}
              onEndReached={this.handleLoadMore}
              onEndReachedThreshold={1}
              renderItem={this._renderItem}
              ListEmptyComponent={
                <TextBody style={styles.emptyText} center>{`No tienes ${(title || '').toLowerCase()}.`}</TextBody>
              }
            />
          </View>
        )}
      </View>
    )
  }
}

const styles = StyleSheet.create(
  {
    tasks: {
      width: '100%',
    },
    emptyText: {
      paddingHorizontal: 10,
    },
    subItemContainer: {
      backgroundColor: Palette.tasksSubList,
      width: '95%',
      marginRight: 5,
      marginLeft: 5,
      height: 250,
      marginBottom: 10,
      borderBottomLeftRadius: 10,
      borderBottomRightRadius: 10,
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      paddingTop: 10,
      paddingBottom: 10,
      zIndex: -9
    },
  }
)

const mapStateToProps = (state) => ({
  data: state.user.notifications,
  events: state.user.eventsWeek,
  notificationDetails: state.user.notificationDetails,
})

const mapDispatchToProps = {
  getNotificationsAsync: userActions.getNotificationsAsync,
  loadMoreNotificationsAsync: userActions.loadMoreNotificationsAsync,
  readNotificationAsync: userActions.readNotificationAsync,
  deleteNotification: userActions.deleteNotification,
  showChatModal: userChatActions.showChatModal,
  leaveChat: userChatActions.leaveChat,
}


export default connect(mapStateToProps, mapDispatchToProps)(NotificationTabContainer);
