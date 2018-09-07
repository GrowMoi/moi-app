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
  quiz: store.user.externalQuiz,
}), {
  getExternalQuizAsync: userActions.loadExternalQuizAsync,
})
export default class QuizTutorScene extends Component {
  state = {
    currentScene: 'intro',
    results: [],
    loading: true,
  }

  componentDidMount() {
    this.getExternalData();
  }

  getExternalData = async () => {
    const { getExternalQuizAsync } = this.props;
    await getExternalQuizAsync(66, 74);

    this.setState({ loading: false });
  }

  jumpToScene = (key) => {
    this.setState({ currentScene: key });
  }

  get renderIntroScene() {
    const { quiz } = this.props;

    return (
      <ComplementaryScene
        title={quiz.player_name}
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

  evaluateQuizAsync = (answers) => {
    console.log(answers);
  };

  render() {
    const { currentScene, loading } = this.state;
    const { quiz } = this.props;
    console.log('QUIZ', quiz);

    return (
      <Background>
        {loading && <Preloader/>}
        {!loading && quiz && Object.keys(quiz).length && (
          <QuizSceneContainer>
            {currentScene === 'intro' && this.renderIntroScene}
            {currentScene === 'quiz' &&
              <Quiz onQuizComplete={this.quizFinished}>
                {(((quiz || {}).questions || {}).questions || []).map(question => (
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
      </Background>
    );
  }
}

QuizTutorScene.propTypes = {
  quiz: PropTypes.object,
};

