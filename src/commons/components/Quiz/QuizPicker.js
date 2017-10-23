import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity } from 'react-native';
import { Header } from '../Typography';

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
      <View>
        {options && options.map((option) => {
          const selected = option.id === selectedValue.id;

          return (
            <TouchableOpacity key={`${option.id}`} onPress={() => this.onPressOption(option)}>
              <Header color={selected ? 'blue' : 'black'}>{option.text}</Header>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }
}


QuizPicker.propTypes = {
  selectedValue: PropTypes.func,
  options: PropTypes.arrayOf(PropTypes.object),
  contentId: PropTypes.number,
};
