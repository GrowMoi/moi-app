import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { View, ScrollView, Image } from 'react-native';
import QuizPicker from './QuizPicker';
import { Header } from '../Typography';
import Button from '../Buttons/Button';
import withSound from '../../utils/withSound';
import { Size } from '../../styles';
import deviceUtils from '../../utils/device-utils'

const Container = styled(View)`
  width: 100%;
`;

const QuizPickerContainer = styled(ScrollView)`
  max-height: ${() => deviceUtils.isTablet() ? '400px' : '280px' };
`;

const Thumbnail = styled(Image)`
  align-self: stretch;
  width: 70%;
  height: ${props => deviceUtils.isTablet() ? '250px' : '160px'}
  border-radius: 2px;
  margin-top: 10px;
  background-color: gray;
  margin-left: 5%;
`;

const ButtonContainer = styled(View)`
  margin-top: 15px;
  justify-content: flex-end;
  flex-direction: row;
  align-self: stretch;
`;

const ThumbnailContainer = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`

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

  renderButtonWithSound = () => {
    const { buttonTitle = '' } = this.props;
    const ButtonWithSound = withSound(Button);

    return (
      <ButtonWithSound onPress={this.submitAnswer} title={buttonTitle} soundName="next" />
    );
  }

  render() {
    const { title = '', options, contentId, mediaUrl } = this.props;

    return (
      <Container>
        <Header center customSize={deviceUtils.isTablet() ? '30px' : '15px'} bolder inverted>{title}</Header>
        <ThumbnailContainer>
          {mediaUrl && <Thumbnail source={{ uri: mediaUrl }} />}
        </ThumbnailContainer>
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
          {this.renderButtonWithSound()}
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
