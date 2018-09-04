import React, { Component } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import Header from './components/Header';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import Preloader from '../../commons/components/Preloader/Preloader';

// Actions
import userActions from '../../actions/userActions';
import tutorActions from '../../actions/tutorActions';

// Own Components
import TaskTabContainer from './components/TaskTabContainer';
import NotificationTabContainer from './components/NotificationTabContainer';
import NotesTabContainer from './components/NotesTabContainer';
import FavoritesTabContainer from './components/FavoritesTabContainer';
import RecomendationsTabContainer from './components/RecomendationsTabContainer';
@connect(store => ({
  neuronSelected: store.neuron.neuronSelected,
  user: store.user,
  tutor: store.tutor,
}), {
  loadUserContentTasksAsync: userActions.loadUserContentTasksAsync,
  getUserNotesAsync: userActions.getStoreNotesAsync,
  loadAllFavorites: userActions.loadAllFavorites,
  getTutorRecomendationAsync: tutorActions.getTutorRecomendationsAsync,
  getNotificationsAsync: userActions.getNotificationsAsync,
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
      getUserNotesAsync,
      loadAllFavorites,
      getTutorRecomendationAsync,
      getNotificationsAsync,
    } = this.props;

    this.setState({ loading: true });

    try {
      await Promise.all([
        loadUserContentTasksAsync(),
        getUserNotesAsync(),
        loadAllFavorites(),
        getTutorRecomendationAsync(),
        getNotificationsAsync(),
      ]);
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

  onPressNote = (note) => {
    Actions.singleContent({
      content_id: note.content_id,
      title: '',
      neuron_id: note.neuron_id,
    });
  }

  render(){
    const {
      user: { tasks, favorites },
      tutor: { recomendations },
    } = this.props;

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
            <RecomendationsTabContainer
              data={(recomendations.contents || [])}
              title='Recomendaciones'
              icon='thumbs-up'
              onClickItem={item => this.onPressItem(item)}
            />
            <NotesTabContainer
              title='Notas'
              icon='edit-2'
              onClickItem={note => this.onPressNote(note)}
            />
            <NotificationTabContainer
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
