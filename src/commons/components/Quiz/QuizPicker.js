import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { View, TouchableOpacity } from 'react-native';
import { TextBody } from '../Typography';
import palette, { colors } from '../../styles/palette';

const ContainerAnswers = styled(View)`
  align-self: stretch;
  margin-vertical: 20;
`;

const Answer = styled(TouchableOpacity)`
  background-color: ${palette.white};
  padding-horizontal: 10;
  padding-vertical: 10;
  margin-bottom: 15;
  shadow-color: ${palette.dark};
  shadow-opacity: 0.5;
  shadow-offset: -2px 2px;
  shadow-radius: 2;
  border-radius: 2;
  border-left-color: ${props => props.selected ? colors.lightGreen : 'transparent'};
  border-left-width: 5;
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

  render() {
    const { selectedValue } = this.state;
    const { options } = this.props;

    return (
      <ContainerAnswers>
        {options && options.map((option) => {
          const selected = option.id === selectedValue.id;

          return (
            <Answer selected={selected} key={`${option.id}`} onPress={() => this.onPressOption(option)}>
              <TextBody color={selected ? colors.lightGreen : 'black'}>{option.text}</TextBody>
            </Answer>
          );
        })}
      </ContainerAnswers>
    );
  }
}


QuizPicker.propTypes = {
  selectedValue: PropTypes.func,
  options: PropTypes.arrayOf(PropTypes.object),
  contentId: PropTypes.number,
};