import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Image, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import styled from 'styled-components/native';
import Neuron from './Neuron';
import treeLevel1Gray from '../../../../assets/images/tree/nivel_1/nivel_1_descubierta.png';
import treeLevel1Color from '../../../../assets/images/tree/nivel_1/nivel_1_color.png';

const treeHeight = 371;
const treeWidth = 213;
const aspect = treeWidth / treeHeight;

const TreeLevel1 = styled(Image)`
  width: ${props => props.width};
  height: ${props => Math.round(props.width / aspect)};
  position: absolute;
  bottom: 50;
  align-self: center;
`;

const Container = styled(View)`
  position: relative;
  flex: 1;
`;

export default class Level1 extends Component {
  static defaultProps = {
    width: 50,
  }

  static propTypes = {
    width: PropTypes.number,
  }

  onPressNeuron = () => {
    Actions.content({ neuron_id: 1, title: 'Jugar' });
  }

  render() {
    const { width } = this.props;
    const contentsLearned = 0;
    const totalContents = 8;
    const currentTree = contentsLearned > 0 ? treeLevel1Color : treeLevel1Gray;

    return (
      <Container>
        <TreeLevel1
          width={width}
          source={currentTree}
          resizeMode='contain'
        >
          <Neuron
            onPress={this.onPressNeuron}
            name='Jugar'
            id={1}
            contentsLearned={contentsLearned}
            totalContents={totalContents}
            size={{ max: 50, min: 37 }}
            position={{ left: 7, bottom: 6 }}
          />
        </TreeLevel1>
      </Container>
    );
  }
}
