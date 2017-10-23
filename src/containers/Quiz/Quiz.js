import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { View, Alert } from 'react-native';
import styled from 'styled-components/native';
import { Title } from '../../commons/components/Typography';
import { Quiz, Question } from '../../commons/components/Quiz';
import userActions from '../../actions/userActions';

const Container = styled(View)`
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
    const results = allResults.filter(response => response.correct);

    Alert.alert('Resultado', `Respondiste ${results.length} de ${allResults.length} correctamente`, [{
      text: 'OK',
      onPress: () => Actions.moiDrawer(),
    }]);
  }

  render() {
    const { quiz } = this.props;
    return (
      <Container>
        <Quiz onQuizComplete={this.quizFinished}>
          {!!quiz.questions && quiz.questions.map((question) => {
            return (
              <Question
                key={`question-${question.content_id}`}
                contentId={question.content_id}
                title={question.title}
                options={question.possible_answers}
                buttonTitle='Siguiente'
              />
            );
          })}
        </Quiz>
      </Container>
    );
  }
}

QuizScene.propTypes = {
  quiz: PropTypes.object,
};
