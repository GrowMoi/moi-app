import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { Header } from '../Typography';
import { Size } from '../../styles';

const ContainerOptions = styled(View)`
  flex: 1;
  padding-horizontal: ${Size.spaceMedium};
  padding-vertical: ${Size.spaceMedium};
`;

const Item = styled(TouchableOpacity)`
  padding-vertical: 7;
`;

export default class Options extends Component {
  render() {
    const { options } = this.props;
    return (
      <ContainerOptions>
        {options.length > 0 && options.map((option, i) => {
          return (
            <Item key={i} onPress={() => option.onPress && option.onPress(option, i)}>
              <Header bolder small inverted>{option.label}</Header>
            </Item>
          );
        })}
      </ContainerOptions>
    );
  }
}

Options.propTypes = {
  options: PropTypes.array,
  onPress: PropTypes.func,
};
