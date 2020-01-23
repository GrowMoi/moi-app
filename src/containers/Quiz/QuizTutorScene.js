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


class QuizTutorScene extends Component {
  state = {
    currentScene: 'intro',
    results: [],
    loading: true,
  }

  componentDidMount() {
    this.getQuizData();
  }

  getQuizData = async () => {
    const { getExternalQuizAsync, quizId, playerId } = this.props;

    if(quizId && playerId) {
      await getExternalQuizAsync(quizId, playerId);
    }
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

  renderFinalScene = (results) => {
    const { quiz } = this.props;

    const correctResults = results.filter(response => response.correct);
    const message = `Respondiste ${correctResults.length} de ${results.length} preguntas correctamente`;

    return (
      <ComplementaryScene
        title='RESULTADO'
        text={message}
        onNext={Actions.pop}
        onNextText='Entendido'
      />
    );
  }

  evaluateQuiz = async (answers = []) => {
    const { evaluateQuizAsync, quiz } = this.props;
    const { player_id, quiz_id } = quiz;

    const allAnswers = answers.map(answer => ({
      answer_id: answer.id,
      content_id: answer.content_id,
    }));

    this.setState({ loading: true });
    const res = await evaluateQuizAsync(quiz_id, player_id, allAnswers);
    this.setState({ loading: false });

    const { data } = res;
    if(!data.result) return;

    const allResults = data.result;

    this.setState({ results: allResults, currentScene: 'results' });
  };

  render() {
    let { currentScene, loading, results } = this.state;
    const { quiz } = this.props;

    if(((quiz || {}).answers || []).length) {
      currentScene = 'results';
      results = quiz.answers;
    };

    return (
      <Background>
        {loading && <Preloader/>}
        {!loading && quiz && Object.keys(quiz).length && (
          <QuizSceneContainer>
            {currentScene === 'intro' && this.renderIntroScene}
            {currentScene === 'quiz' &&
              <Quiz onQuizComplete={this.evaluateQuiz}>
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
            {currentScene === 'results' && this.renderFinalScene(results)}
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

const mapStateToProps = (state) => ({
  quiz: state.user.externalQuiz,
})

const mapDispatchToProps = {
  getExternalQuizAsync: userActions.loadExternalQuizAsync,
  evaluateQuizAsync: userActions.evaluateQuizAsync,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuizTutorScene)
