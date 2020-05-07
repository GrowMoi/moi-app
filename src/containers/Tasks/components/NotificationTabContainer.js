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

class NotificationTabContainer extends PureComponent {
  state = {
    open: false,
    isLoading: false,
  }

  componentDidMount() {
    // this.getData();
  }

  // getData = async () => {
  //   const { getNotificationsAsync } = this.props;
  //   try {
  //     await getNotificationsAsync();
  //   } catch (error) {
  //     // console.log(error);
  //   }
  // }

  openContainer = () => {
    this.setState(prevState => ({ open: !prevState.open }));
  }

  _keyExtractor = (item, index) => uuid();

  onCloseNotification = async (item) => {
    const { readNotificationAsync, deleteNotification } = this.props;

    try {
      const { data = {} } = await readNotificationAsync(item.id);
      if (data.deleted) {
        deleteNotification(item.id);
      }

    } catch (error) {
      console.log(error);
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

  isSuperEvent = item => {
    return item[0] === 'super_event';
  }

  _renderItem = ({ item }) => {
    const { onClickItem = () => null } = this.props;

    const isEvent = this.isEvent(item);

    let title;
    let description;

    if (isEvent) {
      title = this.isSuperEvent(item) ? 'Super Evento' : 'Eventos';
      description = this.isSuperEvent(item) ? '' : `(${item[0]})`;
    } else if (item.type === 'user_chat') {
      const prefix = item.chat.kind === 'outgoing' ? 'Yo' : 'mensaje:';

      title = `Chat con: ${item.chat.chat_with}`;
      description = `${prefix}: ${item.chat.message}`;
    }
    else {
      title = item.title;
      description = item.description;
    }

    return (
      <SubItemRow
        descriptionInverted
        title={title}
        clickClose={isEvent ? null : () => this.onCloseNotification(item)}
        onPress={() => onClickItem(isEvent ? item[1] : item)}
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

    console.log(data);

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
}


export default connect(mapStateToProps, mapDispatchToProps)(NotificationTabContainer);
