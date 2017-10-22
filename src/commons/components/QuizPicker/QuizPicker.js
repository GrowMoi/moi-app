import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity } from 'react-native';
import { Header } from '../Typography';

export default class QuizPicker extends Component {
  state = {
    selectedValue: {},
  }

  onPressOption = (option) => {
    const { selectedValue } = this.props;
    this.setState({ selectedValue: option });
    if (selectedValue) selectedValue(option);
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
};
