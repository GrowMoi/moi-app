import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { View, Keyboard } from 'react-native';
import styled from 'styled-components/native';
import Navbar from '../../commons/components/Navbar/Navbar';
import { BottomBar } from '../../commons/components/SceneComponents';
import { Quiz, Question } from '../../commons/components/Quiz';
import userActions from '../../actions/userActions';
import MoiBackground from '../../commons/components/Background/MoiBackground';
import ComplementaryScene from './ComplementaryQuizScene';
import Preloader from '../../commons/components/Preloader/Preloader';
import { Video } from '../../commons/components/VideoPlayer';
import creditos from '../../../assets/videos/creditos.mp4';
import NewAchievementsModal from '../../commons/components/Quiz/NewAchievements';
import UserInactivity from 'react-native-user-inactivity';
import PassiveMessageAlert from '../../commons/components/Alert/PassiveMessageAlert';
import { Sound } from '../../commons/components/SoundPlayer';
import { TIME_FOR_INACTIVITY } from '../../constants';
import EventCompletedModal from '../../commons/components/Quiz/EventCompleted';

const Background = styled(MoiBackground)`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const QuizSceneContainer = styled(View)`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

@connect(store => ({
  quiz: store.user.quiz,
  device: store.device,
  scene: store.routes.scene,
}), {
  learnContentsAsync: userActions.learnContentsAsync,
  evaluateFinalTestAsync: userActions.evaluateFinalTestAsync,
  saveResultFinalTest: userActions.saveResultFinalTest,
})
export default class QuizScene extends Component {
  state = {
    currentScene: 'intro',
    results: [],
    loading: false,
    modalVisible: false,
    resultFinalTest: null,
    showModalNewAchievements: false,
    showEventCompleted: false,
    achievements: [],
    isOpenPassiveMessage: false,
  }

  soundQuizFinishedPlayed;

  componentDidMount() {
    const { quiz } = this.props;
    this.soundQuizFinishedPlayed = false;
    if(quiz.questions.length === 21) {
      this.jumpToScene('quiz');
    }
  }

  showVideo = (show = true) => {
    this.setState({ modalVisible: show});
  }

  saveResultFinalTest = () => {
    const { saveResultFinalTest } = this.props;
    saveResultFinalTest(this.state.resultFinalTest);
  }

  onPlaybackStatusUpdate = async (playbackStatus) => {
      if(playbackStatus.didJustFinish) {
        this.showVideo(false);
        this.saveResultFinalTest();
        Actions.inventory({ type: 'reset' });
      }
  }

  quizFinished = async (answers) => {
    const { quiz, learnContentsAsync, evaluateFinalTestAsync } = this.props;

    const allAnswers = answers.map(answer => ({
      answer_id: answer.id,
      content_id: answer.content_id,
    }));
    const formatedAnswers = JSON.stringify(allAnswers);
    this.setState({ loading: true });
    const isFinalTest = quiz.questions.length === 21;
    const evaluateQuiz = isFinalTest ? evaluateFinalTestAsync : learnContentsAsync;
    const res = await evaluateQuiz(quiz.id, formatedAnswers);
    this.setState({ loading: false });

    const { data } = res;
    if (!data.result) return;

    if (isFinalTest) {
      this.validateResultFinalTest(data);
      return;
    }

    const { achievements, result, event = {} } = data;

    if(achievements.length > 0) {
      this.showModalNewAchievements(achievements);
    }

    if(event.completed) {
      this.showEventCompletedModal(event.info.title);
    }

    this.setState({ results: result, currentScene: 'results' });
  }

  validateResultFinalTest = (data) => {
     const correctResults = data.result.filter(response => response.correct);

     const percentajeCorrects = (correctResults.length * 100) / 21;
     if(percentajeCorrects > 70) {
      this.setState({resultFinalTest: data});
      this.showVideo(true);
     } else {
      Actions.inventory({ type: 'reset' });
     }

  }

  jumpToScene = (key) => {
    this.setState({ currentScene: key });
  }

  get renderIntroScene() {
    return (
      <ComplementaryScene
        title='Has leído 4 contenidos'
        text='¿Por qué no probamos si de verdad has aprendido?'
        onNext={() => this.jumpToScene('quiz')}
      />
    );
  }

  get renderFinalScene() {
    const { results } = this.state;

    const correctResults = results.filter(response => response.correct);
    const message = `Respondiste ${correctResults.length} de ${results.length} preguntas correctamente`;

    if(!this.soundQuizFinishedPlayed) {
      Sound.playOverBackgroundSound('recompensa');
      this.soundQuizFinishedPlayed = true;
    }


    return (
      <ComplementaryScene
        title='RESULTADO'
        text={message}
        onNext={Actions.moiDrawer}
      />
    );
  }

  showModalNewAchievements = (achievements) => {
    this.setState({ showModalNewAchievements: true, achievements: achievements });
  }

  hideModalNewAchievements = () => {
    this.setState({ showModalNewAchievements: false });
  }

  showEventCompletedModal = (title) => {
    this.setState({ showEventCompleted: true, eventTitle: title });
  }

  hideEventCompletedModal = () => {
    this.setState({ showEventCompleted: false });
  }

  render() {
    const { currentScene, loading, modalVisible, showModalNewAchievements, achievements, isOpenPassiveMessage, eventTitle, showEventCompleted } = this.state;
    const { quiz, device: { dimensions: { width } }, scene } = this.props;

    const videoDimensions = {
      width: 1280,
      height: 720
    };

    return (
      <UserInactivity
        timeForInactivity={TIME_FOR_INACTIVITY}
        onAction={(isActive) => {
          if (!isActive && scene.name === 'quiz' && !showModalNewAchievements && !loading) {
            Keyboard.dismiss()
            this.setState({ isOpenPassiveMessage: !isActive })
          }
        }}
      >
        <Background>
          {quiz && Object.keys(quiz).length && (
            <QuizSceneContainer>
              {loading && <Preloader />}
              {currentScene === 'intro' && this.renderIntroScene}
              {currentScene === 'quiz' &&
                <Quiz onQuizComplete={this.quizFinished}>
                  {quiz.questions.map(question => (
                    <Question
                      key={`question-${question.content_id}`}
                      contentId={question.content_id}
                      title={question.title}
                      options={question.possible_answers}
                      buttonTitle='Siguiente'
                      mediaUrl={question.media_url}
                    />
                  ))}
                </Quiz>}
              {currentScene === 'results' && this.renderFinalScene}
            </QuizSceneContainer>
          )}
          <Navbar />
          <BottomBar />
          {modalVisible && <Video
            videoDimensions={videoDimensions}
            source={creditos}
            dismiss={() => this.showVideo(false)}
            visible={modalVisible}
            width={width}
            onPlaybackStatusUpdate={this.onPlaybackStatusUpdate}
            showCloseIcon={false}
          />}
          {showModalNewAchievements && <NewAchievementsModal achievements={achievements} onHideModal={this.hideModalNewAchievements} />}
          {!showModalNewAchievements && showEventCompleted && <EventCompletedModal eventTitle={eventTitle} onHideModal={this.hideEventCompletedModal} />}
          <PassiveMessageAlert
            isOpenPassiveMessage={isOpenPassiveMessage}
            touchableProps={{
              onPress: () => {
                this.setState(prevState => ({ isOpenPassiveMessage: !prevState.isOpenPassiveMessage }))
              }
            }}
            message='Elige una alternativa y presiona la flecha para continuar'
          />
        </Background>
      </UserInactivity>
    );
  }
}

QuizScene.propTypes = {
  quiz: PropTypes.object,
};

