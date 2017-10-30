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
}), {
  learnContentsAsync: userActions.learnContentsAsync,
})
export default class QuizScene extends Component {
  state = {
    currentScene: 'intro',
    results: [],
  }

  quizFinished = async (answers) => {
    const { quiz, learnContentsAsync } = this.props;

    const allAnswers = answers.map(answer => ({
      answer_id: answer.id,
      content_id: answer.content_id,
    }));

    const formatedAnswers = JSON.stringify(allAnswers);
    const res = await learnContentsAsync(quiz.id, formatedAnswers);
    const { data } = res;
    if (!data.result) return;

    const allResults = data.result;

    this.setState({ results: allResults, currentScene: 'results' });
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
    const { currentScene } = this.state;
    const { quiz } = this.props;

    return (
      <Background>
        {quiz && Object.keys(quiz).length && (
          <QuizSceneContainer>
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
      </Background>
    );
  }
}

QuizScene.propTypes = {
  quiz: PropTypes.object,
};

