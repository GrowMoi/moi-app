import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { View, TouchableOpacity } from 'react-native';
import { TextBody } from '../Typography';
import palette, { colors } from '../../styles/palette';
import withSound from '../../utils/withSound';
import deviceUtils from '../../utils/device-utils'

const ContainerAnswers = styled(View)`
  align-self: stretch;
  margin-vertical: 20px;
`;

const Answer = styled(TouchableOpacity)`
  background-color: ${palette.white};
  padding-horizontal: 10px;
  padding-vertical: ${() => deviceUtils.isTablet() ? '20px' : '15px'};
  margin-bottom: 15px;
  shadow-color: ${palette.dark};
  shadow-opacity: 0.5;
  shadow-offset: -2px 2px;
  shadow-radius: 2px;
  border-radius: 2px;
  border-left-color: ${props => props.selected ? colors.lightGreen : 'transparent'};
  border-left-width: 5px;
`;

export default class QuizPicker extends Component {
  state = {
    selectedValue: {},
  }

  onPressOption = (option) => {
    const { selectedValue, contentId = 0 } = this.props;
    const currentOption = { ...option, content_id: contentId }
    this.setState({ selectedValue: currentOption });
    if (selectedValue) selectedValue(currentOption);
  }

  renderAnswerWithSound = (option) => {
    const { selectedValue } = this.state;
    const selected = option.id === selectedValue.id;
    const AnswerWithSound = withSound(Answer);

    return (
      <AnswerWithSound selected={selected} key={`${option.id}`} onPress={() => this.onPressOption(option)} soundName="selectOption">
        <TextBody color={selected ? colors.lightGreen : 'black'}>{option.text}</TextBody>
      </AnswerWithSound>
    );
  }

  render() {
    const { options } = this.props;

    return (
      <ContainerAnswers>
        {options && options.map((option) => this.renderAnswerWithSound(option))}
      </ContainerAnswers>
    );
  }
}

QuizPicker.propTypes = {
  selectedValue: PropTypes.func,
  options: PropTypes.arrayOf(PropTypes.object),
  contentId: PropTypes.number,
};
