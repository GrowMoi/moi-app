import React, { Component } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import Header from './components/Header';
import { connect } from 'react-redux';
import userActions from '../../actions/userActions';
import { Actions } from 'react-native-router-flux';
import Preloader from '../../commons/components/Preloader/Preloader';

// Own Components
import TaskTabContainer from './components/TaskTabContainer';
import NotificationTabContainer from './components/NotificationTabContainer';
import NotesTabContainer from './components/NotesTabContainer';
import FavoritesTabContainer from './components/FavoritesTabContainer';
@connect(store => ({
  neuronSelected: store.neuron.neuronSelected,
  user: store.user,
}), {
  loadUserContentTasksAsync: userActions.loadUserContentTasksAsync,
  getNotificationsAsync: userActions.getNotificationsAsync,
  getUserNotesAsync: userActions.getStoreNotesAsync,
  loadAllFavorites: userActions.loadAllFavorites,
})
class TasksContainer extends Component {
  state = {
    loading: false,
  }

  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    const {
      loadUserContentTasksAsync,
      getNotificationsAsync,
      getUserNotesAsync,
      loadAllFavorites,
    } = this.props;

    this.setState({ loading: true });

    try {
      await Promise.all([
        loadUserContentTasksAsync(),
        getUserNotesAsync(),
        getNotificationsAsync(),
        loadAllFavorites(),
      ])
    } catch (error) {
      console.log(error);
    }

    this.setState({ loading: false });
  }

  onPressItem = (item) => {
    const { neuronSelected } = this.props;
    const { id, neuron_id, title } = item;

    Actions.singleContent({
      content_id: id,
      title: neuronSelected.title,
      neuron_id,
    });
  }

  render(){
    const { user: { tasks, notifications, notes, favorites } } = this.props;
    const { loading } = this.state;

    return(
      <View style={styles.container}>
        <Header title='Mis Tareas' />
        <ScrollView>
          {!loading && <View style={styles.scrollContainer}>
            <TaskTabContainer
              data={((tasks.content_tasks || {}).content_tasks || [])}
              title='Tareas'
              icon='list'
              onClickItem={item => this.onPressItem(item)}
            />
            <FavoritesTabContainer
              data={((favorites.content_tasks || {}).content_tasks || [])}
              title='Favoritos'
              icon='star'
              onClickItem={item => this.onPressItem(item)}
            />
            <NotesTabContainer
              data={((notes.content_notes || {}).content_notes || [])}
              title='Notas'
              icon='edit-2'
            />
            <NotificationTabContainer
              data={notifications}
              title='Notificaciones'
              icon='bell'
            />
          </View>}
          {loading && <Preloader />}
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    flex: 1,
    width: '90%',
    paddingHorizontal: 10,
  },
  scrollContainer: {
    alignItems: 'center',
  },
})

export default TasksContainer;
