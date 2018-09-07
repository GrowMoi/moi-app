import React, { PureComponent } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import ItemTasks from './ItemTasks';
import SubItemRow from './SubItemRow';
import { TextBody } from '../../../commons/components/Typography';
import { Palette } from './../../../commons/styles';
import uuid from 'uuid/v4';
import { connect } from 'react-redux';

// Actions
import userActions from '../../../actions/userActions';

@connect(state => ({
  data: state.user.notifications,
}), {
  getNotificationsAsync: userActions.getNotificationsAsync,
  loadMoreNotificationsAsync: userActions.loadMoreNotificationsAsync,
  readNotificationAsync: userActions.readNotificationAsync,
  deleteNotification: userActions.deleteNotification,
})
class NotificationTabContainer extends PureComponent {
  state = {
    open: false,
    isLoading: false,
  }

  componentDidMount() {
    // this.getData();
  }

  getData = async () => {
    const { getNotificationsAsync } = this.props;
    try {
      await getNotificationsAsync();
    } catch (error) {
      // console.log(error);
    }
  }

  openContainer = () => {
    this.setState(prevState => ({ open: !prevState.open }));
  }

  _keyExtractor = (item, index) => uuid();

  onCloseNotification = async (item) => {
    const { readNotificationAsync, deleteNotification } = this.props;

    try {
      const { data = {} } = await readNotificationAsync(item.id);
      if(data.deleted) {
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

  render() {
    const { title, icon, data, onClickItem = () => null } = this.props;
    const { open } = this.state;

    console.log('NOTIFICATION', data);

    return(
      <View style={styles.tasks}>
        <ItemTasks onPress={this.openContainer} title={title} icon={icon} />
        {open && (
          <View style={styles.subItemContainer}>
              <FlatList
                data={data.notifications}
                keyExtractor={this._keyExtractor}
                onEndReached={this.handleLoadMore}
                onEndReachedThreshold={0}
                renderItem={({ item }) => {
                  return <SubItemRow
                    title={item.title}
                    clickClose={() => this.onCloseNotification(item)}
                    onPress={() => onClickItem(item)}
                    description={item.description}
                  />
                }
                  }
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
      width: '95%',
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


export default NotificationTabContainer;
