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
  }

  componentDidMount() {
    const { quiz } = this.props;
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

    const allResults = data.result;

    this.setState({ results: allResults, currentScene: 'results' });
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

    return (
      <ComplementaryScene
        title='RESULTADO'
        text={message}
        onNext={Actions.moiDrawer}
      />
    );
  }

  render() {
    const { currentScene, loading, modalVisible } = this.state;
    const { quiz, device: { dimensions: { width } } } = this.props;

    const videoDimensions = {
      width: 1280,
      height: 720
    };

    return (

      <Background>
        {quiz && Object.keys(quiz).length && (
          <QuizSceneContainer>
            {loading && <Preloader/>}
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
        <Navbar/>
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
      </Background>
    );
  }
}

QuizScene.propTypes = {
  quiz: PropTypes.object,
};

