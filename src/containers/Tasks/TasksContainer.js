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
import EventTabContainer from './components/EventTabContainer';
import TutorGenericAlert from '../../commons/components/Alert/TutorGenericAlert';
import EventModal from '../Events/EventModal';
import LeaderBoardModal from '../LeaderBoard/LeaderboardModal';
import leaderboardActions from '../../actions/leaderboardActions';

@connect(store => ({
  device: store.device,
  neuronSelected: store.neuron.neuronSelected,
  leaders: store.leaderboard.leaders,
  profile: store.user.profile,
}), {
    loadUserContentTasksAsync: userActions.loadUserContentTasksAsync,
    getUserNotesAsync: userActions.getStoreNotesAsync,
    loadAllFavorites: userActions.loadAllFavorites,
    getTutorRecomendationAsync: tutorActions.getTutorRecomendationsAsync,
    getNotificationsAsync: userActions.getNotificationsAsync,
    getEventInProgressAsync: userActions.getEventInProgressAsync,
    getEventsWeekAsync: userActions.getEventsWeekAsync,
    getLeadersSuperEventAsync: leaderboardActions.getLeadersSuperEventAsync,
  })
class TasksContainer extends Component {
  state = {
    loading: false,
    isAlertOpen: false,
    alertType: false,
    itemSelected: {},
    enableScroll: true,
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
      getEventInProgressAsync,
      getEventsWeekAsync,
    } = this.props;

    this.setState({ loading: true });

    try {
      await Promise.all([
        loadUserContentTasksAsync(),
        getUserNotesAsync(),
        loadAllFavorites(),
        getTutorRecomendationAsync(),
        getNotificationsAsync(),
        getEventInProgressAsync(),
        getEventsWeekAsync(),
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
    const isEvent = Array.isArray(item);
    const isSuperEvent = isEvent && !!item[0].achievements;
    const isSuperEventTaken = isSuperEvent && item[0].taken;

    if(isSuperEventTaken) {
      this.showLeaderBoard();
      return;
    } else if (isEvent) {
      this.setState({ isEventModalOpen: true, itemSelected: item });
      return;
    }

    this.setState({ isAlertOpen: true, itemSelected: item });
  }

  async showLeaderBoard() {
    const { getLeadersSuperEventAsync, profile } = this.props;
    await getLeadersSuperEventAsync(profile.id, 1);

    this.setState({ isLeaderboardModalOpen: true});
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

    if (itemSelected.type === 'tutor_quiz') {
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

  enableMainScroll = (scrollEnabled) => () => {
    this.scrollRef.setNativeProps({ scrollEnabled: scrollEnabled });
  }

  render() {
    const { device: { dimensions: { width } }, leaders } = this.props;
    const { loading, isAlertOpen, isEventModalOpen, itemSelected, isLeaderboardModalOpen } = this.state;

    return (
      <View style={styles.container}>
        <Header title='Mis Tareas' />
        <ScrollView ref={(e) => { this.scrollRef = e }}>
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
              enableScroll={this.enableMainScroll(true)}
              disableScroll={this.enableMainScroll(false)}
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
            <EventTabContainer
              title='Eventos'
              icon='calendar'
              onClickItem={(item) => this.onPressNotification(item)}
              enableScroll={this.enableMainScroll(true)}
              disableScroll={this.enableMainScroll(false)}
            />
          </View>}
          {loading && <Preloader />}
        </ScrollView>

        {isEventModalOpen &&
          <EventModal
            width={width}
            events={itemSelected}
            onCloseButtonPress={() => { this.setState({ isEventModalOpen: false }) }} />
        }

        {isLeaderboardModalOpen &&
          <LeaderBoardModal
            data= {leaders}
            onClose={() => { this.setState({ isLeaderboardModalOpen: false }) }} />
        }

        {isAlertOpen && <Alert open={isAlertOpen}>
          {this.correspondingAlert()}
        </Alert>}
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
