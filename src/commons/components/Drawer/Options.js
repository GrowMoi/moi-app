import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { Header } from '../Typography';
import { Size } from '../../styles';
import withSound from '../../utils/withSound';

const ContainerOptions = styled(View)`
  flex: 1;
  padding-horizontal: ${Size.spaceMedium};
  padding-vertical: ${Size.spaceMedium};
  z-index: 10;
`;

const Item = styled(TouchableOpacity)`
  padding-vertical: 7;
`;

export default class Options extends Component {

  renderItemWithSound = (option, i) => {
    const ItemWithSound = withSound(Item);

    return (
      <ItemWithSound
      key={i}
      soundName={option.id}
      onPress={() => {
        if(option.onPress){
          option.onPress(option, i)
        }
      }}>
        <Header bolder small inverted>{option.label}</Header>
      </ItemWithSound>
    );
  }

  render() {
    const { options } = this.props;
    return (
      <ContainerOptions>
        {options.length > 0 && options.map((option, i) => this.renderItemWithSound(option, i))}
      </ContainerOptions>
    );
  }
}

Options.propTypes = {
  options: PropTypes.array,
  onPress: PropTypes.func,
};
