import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';

export default class Quiz extends Component {
  state = {
    currentQuestion: 0,
    answers: [],
  }

  componentWillMount() {
    this.questions = this.renderQuestions();
  }

  storeAnswer = (answer) => {
    const { children } = this.props;
    const totalQuestions = React.Children.count(children) - 1;
    if (!answer) return;

    this.setState(prevState => ({
      answers: prevState.answers.concat(answer),
      currentQuestion: prevState.currentQuestion >= totalQuestions ? prevState.currentQuestion : (prevState.currentQuestion + 1),
    }));
  }

  onQuizFinished = (answer) => {
    if (!answer) return;

    const { answers } = this.state;
    const { onQuizComplete } = this.props;

    const allAnswers = answers.concat(answer);
    if (onQuizComplete) onQuizComplete(allAnswers);
  }

  renderQuestions = () => {
    const { children } = this.props;

    const questions = React.Children.toArray(children);
    const quizQuestions = questions.map((child, i) => {
      let props;

      if (i === questions.length - 1) {
        props = { onSubmit: answer => this.onQuizFinished(answer) };
      } else {
        props = { onSubmit: answer => this.storeAnswer(answer) };
      }

      const Question = child.type;
      return <Question key={`question-${i}`} { ...child.props } { ...props } />;
    });

    return quizQuestions;
  }

  render() {
    const { currentQuestion } = this.state;
    return (
      <View>
        {this.questions[currentQuestion]}
      </View>
    );
  }
}

Quiz.propTypes = {
  children: PropTypes.any,
  onQuizComplete: PropTypes.func,
};
