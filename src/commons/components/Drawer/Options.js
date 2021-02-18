import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import { Header } from '../Typography';
import { Size } from '../../styles';
import withSound from '../../utils/withSound';
import { Palette } from '../../styles'
import { colors } from '../../styles/palette'
import { Feather } from '@expo/vector-icons';
import chroma from 'chroma-js'


const ContainerOptions = styled(View)`
  z-index: 10;
  padding-horizontal: ${Size.spaceMedium};
  justify-content: flex-start;
  border-bottom-width: 1px;
  padding-bottom: 10;
  border-color: ${colors.blueSubList};
`;

const Item = styled(TouchableOpacity)`
  padding-vertical: 4;
`;

const ButtonForm = styled(View)`
  padding-vertical: 10px;
  width: 100%;
  justify-content: flex-start;
  flex-direction: row;
  background-color: transparent;
  align-items: center;
`
const styles = StyleSheet.create({
  icon: {
    marginHorizontal: 10,
    color: Palette.colors.darkBlue.css(),
  },
})

const ItemWithSound = ({ option, index }) => {
  const WithSound = withSound(Item);

  return (
    <WithSound
      soundName={option.id}
      onPress={() => { if(option.onPress) option.onPress(option, index) }}
    >
      <ButtonForm>
        <Feather style={styles.icon} name={option.icon} size={20}  />
        <Header small bolder color={Palette.colors.darkBlue}>{option.label}</Header>
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
