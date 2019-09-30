import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { View } from 'react-native';
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
import PassiveMessageAlert from '../../commons/components/Alert/PassiveMessageAlert';
import { Sound } from '../../commons/components/SoundPlayer';
import LevelPassedTransition from './LevelPassedTransition';
import neuronActions from '../../actions/neuronActions';

const Background = styled(MoiBackground)`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const QuizSceneContainer = styled(View)`
  flex: 1;
  width: 80%;
  align-items: center;
  justify-content: center;
`;

class QuizScene extends Component {
  state = {
    currentScene: 'intro',
    results: [],
    loading: false,
    modalVisible: false,
    resultFinalTest: null,
    showLevelPassedAnimation: false,
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

    const { result } = data;

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
      this.props.stopCurrentBackgroundAudio();
      Sound.playOverBackgroundSound('recompensa');
      this.soundQuizFinishedPlayed = true;
    }

    return (
      <ComplementaryScene
        title='RESULTADO'
        text={message}
        onNext={() => {this.setState({ showLevelPassedAnimation: true, currentScene: '' });}}
      />
    );
  }

  render() {
    const { currentScene, loading, modalVisible, showLevelPassedAnimation } = this.state;
    const { quiz, device: { dimensions: { width } }, scene, showPassiveMessage, showPassiveMessageAsync } = this.props;

    const videoDimensions = {
      width: 1280,
      height: 720
    };

    return (
      <Background>
        {quiz && Object.keys(quiz).length && (
          <QuizSceneContainer>
            {currentScene === 'intro' && this.renderIntroScene}
            {currentScene === 'quiz' && !loading &&
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
            {loading && <Preloader />}
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
          skipButton
        />}
        {showLevelPassedAnimation && <LevelPassedTransition/>}
        <PassiveMessageAlert
          isOpenPassiveMessage={showPassiveMessage && scene.name === 'quiz' &&  !loading}
          touchableProps={{
            onPress: () => {
              showPassiveMessageAsync(false);
            }
          }}
          message='Elige una alternativa y presiona la flecha para continuar'
        />
      </Background>
    );
  }
}

QuizScene.propTypes = {
  quiz: PropTypes.object,
};

const mapStateToProps = (state) => ({
  quiz: state.user.quiz,
  device: state.device,
  scene: state.routes.scene,
  showPassiveMessage: state.user.showPassiveMessage,
})

const mapDispatchToProps = {
   learnContentsAsync: userActions.learnContentsAsync,
  evaluateFinalTestAsync: userActions.evaluateFinalTestAsync,
  saveResultFinalTest: userActions.saveResultFinalTest,
  showPassiveMessageAsync: userActions.showPassiveMessageAsync,
  stopCurrentBackgroundAudio: neuronActions.stopCurrentBackgroundAudio,
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizScene)

