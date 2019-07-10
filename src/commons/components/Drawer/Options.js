import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { Header } from '../Typography';
import { Size } from '../../styles';
import withSound from '../../utils/withSound';
import { Palette } from '../../styles'
import chroma from 'chroma-js'

const ItemWithSound = ({ option, index }) => {
  const WithSound = withSound(Item);

  return (
    <WithSound
      soundName={option.id}
      onPress={() => { if(option.onPress) option.onPress(option, index) }}
    >
      <ButtonForm>
        <Header small color={Palette.colors.dark} heavy>{option.label}</Header>
      </ButtonForm>
    </WithSound>
  )
}

export default class Options extends Component {
  render() {
    const { options } = this.props;

    return (
      <ContainerOptions>
        {(options || []).map((option, i) => {
          return <ItemWithSound option={option} index={i} key={i} />
        })}
      </ContainerOptions>
    );
  }
}

Options.propTypes = {
  options: PropTypes.array,
  onPress: PropTypes.func,
};

const ContainerOptions = styled(View)`
  flex: 1;
  padding-horizontal: ${Size.spaceMedium};
  padding-vertical: ${Size.spaceXSmall};
  z-index: 10;
`;

const Item = styled(TouchableOpacity)`
  padding-vertical: 4;
`;

const ButtonForm = styled(View)`
  padding-vertical: 10px;
  padding-horizontal: 15px;
  border-radius: 10px;
  background-color: ${chroma('#dbd05c').alpha(0.6)};
  shadow-color: black;
  shadow-offset: 1px 3px;
  shadow-opacity: 0.2;
  shadow-radius: 3px;
`
