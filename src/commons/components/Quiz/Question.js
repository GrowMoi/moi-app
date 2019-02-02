import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { View, ScrollView, Image } from 'react-native';
import QuizPicker from './QuizPicker';
import { Header } from '../Typography';
import Button from '../Buttons/Button';

const Container = styled(View)`
  width: 240px
`;

const QuizPickerContainer = styled(ScrollView)`
  height: 280px;
`;

const Thumbnail = styled(Image)`
  align-self: stretch;
  height: 160px;
  border-radius: 2;
  margin-top: 10;
`;

const ButtonContainer = styled(View)`
  justify-content: flex-end;
  flex-direction: row;
  align-self: stretch;
`;

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
    const { title = '', options, buttonTitle = '', contentId, mediaUrl } = this.props;

    return (
      <Container>
        <Header bolder inverted>{title}</Header>
        {mediaUrl && <Thumbnail source={{uri: mediaUrl }} />}
        <QuizPickerContainer>
          {options &&
            <QuizPicker
              contentId={contentId}
              options={options}
              selectedValue={this.onSelectedAnswer}
            />
          }
        </QuizPickerContainer>
        <ButtonContainer>
          <Button onPress={this.submitAnswer} title={buttonTitle} />
        </ButtonContainer>
      </Container>
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
  mediaUrl: PropTypes.any,
};
