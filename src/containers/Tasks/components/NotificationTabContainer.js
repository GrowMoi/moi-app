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
    const { data: { meta: { total_count = 0 } } } = this.props;
    const totalNotifications = total_count + this.events.length;
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

  isContentValidation = (item = {}) => {
    return item.type === 'tutor_validated_content'
  }

  getContentValidationMetaData = (data) => {
    const { approved, content_title, message = '' } = data || {};
    let title, description;
    if (approved) {
      title = `¡Bien hecho! Tu respuesta a ${content_title} fue aprobada por tu tutor`;
      description = '';
    } else {
      title = `Gracias por subir una respuesta a ${content_title}. Lamentablemente, no cumplió con los requisitos mínimos para ser aprobada.`;
      description = `Nota: ${message}`;
    }
    return { title, description };
  }

  _renderItem = ({ item }) => {
    const { onClickItem = () => null } = this.props;

    const isEvent = this.isEvent(item);

    const isContentValidation = this.isContentValidation(item);

    let title;
    let description;

    if (isEvent) {
      title = this.isSuperEvent(item) ? 'Super Evento' : 'Eventos';
      description = this.isSuperEvent(item) ? '' : `(${item[0]})`;
    } else if (isContentValidation) {
      const meta = this.getContentValidationMetaData(item.data);
      title = meta.title;
      description = meta.description;
    } else {
      title = item.title;
      description = item.description;
    }

    return (
      <SubItemRow
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
    const { title, icon, data, onTouchStart, onMomentumScrollEnd  } = this.props;
    const { open } = this.state;

    return (
      <View style={styles.tasks}>
        {this.renderBadge()}
        <ItemTasks onPress={this.openContainer} title={title} icon={icon} />
        {open && (
          <View style={styles.subItemContainer}>
            <FlatList
              data={[...this.events, ...data.notifications]}
              keyExtractor={this._keyExtractor}
              onEndReached={this.handleLoadMore}
              onEndReachedThreshold={1}
              renderItem={this._renderItem}
              ListEmptyComponent={
                <TextBody style={styles.emptyText} center>{`No tienes ${(title || '').toLowerCase()}.`}</TextBody>
              }
              onTouchStart={() => {
                if(onTouchStart) onTouchStart()
              }}
              onScrollEndDrag={() => {
                if(onMomentumScrollEnd) onMomentumScrollEnd();
              }}
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
      backgroundColor: Palette.tasksSubList.css(),
      position: 'relative',
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
    },
  }
)

const mapStateToProps = (state) => ({
  data: state.user.notifications,
  events: state.user.eventsWeek,
})

const mapDispatchToProps = {
  getNotificationsAsync: userActions.getNotificationsAsync,
  loadMoreNotificationsAsync: userActions.loadMoreNotificationsAsync,
  readNotificationAsync: userActions.readNotificationAsync,
  deleteNotification: userActions.deleteNotification,
}


export default connect(mapStateToProps, mapDispatchToProps)(NotificationTabContainer);
