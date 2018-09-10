import React, { Component } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import Header from './components/Header';
import { connect } from 'react-redux';
import { Actions, ActionConst } from 'react-native-router-flux';
import Preloader from '../../commons/components/Preloader/Preloader';
import Alert from '../../commons/components/Alert/Alert';
import TutorQuizAlert from '../../commons/components/Alert/TutorQuizAlert';
import GenericAlert from '../../commons/components/Alert/GenericAlert';

// Actions
import userActions from '../../actions/userActions';
import tutorActions from '../../actions/tutorActions';

// Components
import TaskTabContainer from './components/TaskTabContainer';
import NotificationTabContainer from './components/NotificationTabContainer';
import NotesTabContainer from './components/NotesTabContainer';
import FavoritesTabContainer from './components/FavoritesTabContainer';
import RecomendationsTabContainer from './components/RecomendationsTabContainer';
import TutorGenericAlert from '../../commons/components/Alert/TutorGenericAlert';

@connect(store => ({
  neuronSelected: store.neuron.neuronSelected,
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
    isAlertOpen: false,
    alertType: false,
    itemSelected: {},
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

  onPressNotification = (item) => {
    this.setState({ isAlertOpen: true, itemSelected: item });
  }

  goToTutorQuiz = () => {
    const { itemSelected } = this.state;
    this.setState({ isAlertOpen: false });

    var url = itemSelected.description.match(/(https?:\/\/[^\s]+)/g);

    if (url && url[0]) {
      var data = url[0].match(/quiz\/(\d*)\/player\/(\d*)/);

      if (data && (data || []).length) {
        Actions.tutorQuiz({
          quizId: parseInt(data[1]),
          playerId: parseInt(data[2]),
        });
      }
    }
  }

  closeAlert = () => {
    this.setState({ isAlertOpen: false });
  }

  correspondingAlert = () => {
    const { itemSelected } = this.state;

    if(itemSelected.type === 'tutor_quiz') {
      const tutorMessage = `El tutor ${(itemSelected.tutor || {}).name || ''} ha creado un test para ti`;
      const tutorDescription = itemSelected.description;

      return (
        <TutorQuizAlert
          message={tutorMessage}
          description={tutorDescription}
          onNext={this.goToTutorQuiz}
          onCancel={this.closeAlert}
        />
      )
    } else if (itemSelected.type === 'generic') {
      return (
        <GenericAlert
          message={itemSelected.title}
          description={itemSelected.description}
          onCancel={this.closeAlert}
          cancelText='Ok'
        />
      )
    } else if (itemSelected.type === 'tutor_generic') {

      return (
        <TutorGenericAlert
          message={itemSelected.title}
          description={itemSelected.description}
          onCancel={this.closeAlert}
          video={itemSelected.videos[0]}
          media={itemSelected.media[0]}
          cancelText='Ok'
        />
      )
    }
    else {
      return (
        <GenericAlert
          message={itemSelected.title}
          description={itemSelected.description}
          onCancel={this.closeAlert}
          cancelText='Ok'
        />
      )
    }
  }

  render(){
    const { loading, isAlertOpen } = this.state;

    return(
      <View style={styles.container}>
        <Header title='Mis Tareas' />
        <ScrollView>
          {!loading && <View style={styles.scrollContainer}>
            <TaskTabContainer
              title='Tareas'
              icon='list'
              onClickItem={item => this.onPressItem(item)}
            />
            <FavoritesTabContainer
              title='Favoritos'
              icon='star'
              onClickItem={item => this.onPressItem(item)}
            />
            <RecomendationsTabContainer
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
              onClickItem={(item) => this.onPressNotification(item)}
            />
          </View>}
          {loading && <Preloader />}
        </ScrollView>

        <Alert open={isAlertOpen}>
          {this.correspondingAlert()}
        </Alert>
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
