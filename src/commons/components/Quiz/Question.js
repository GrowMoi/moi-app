import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Button } from 'react-native';
import QuizPicker from './QuizPicker';

export default class Question extends Component {
  state = {
    selectedAnswer: '',
  }

  submitAnswer = () => {
    const { selectedAnswer } = this.state;
    const { onSubmit } = this.props;
    if (onSubmit) onSubmit(selectedAnswer);
  }

  onSelectedAnswer = (answer) => {
    this.setState({ selectedAnswer: answer });
  }

  render() {
    const { title = '', options, buttonTitle = '', contentId } = this.props;

    return (
      <View>
        <Text>{title}</Text>
        <View>
          {options &&
            <QuizPicker
              contentId={contentId}
              options={options}
              selectedValue={this.onSelectedAnswer}
            />
          }
        </View>
        <View>
          <Button onPress={this.submitAnswer} title={buttonTitle} />
        </View>
      </View>
    );
  }
}


Question.propTypes = {
  title: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.object),
  selectedValue: PropTypes.func,
  onSubmit: PropTypes.func,
  buttonTitle: PropTypes.string,
  contentId: PropTypes.number,
};
