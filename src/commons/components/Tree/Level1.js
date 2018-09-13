import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ImageBackground, View, Dimensions } from 'react-native';
import { Actions } from 'react-native-router-flux';
import styled from 'styled-components/native';
import Neuron from './Neuron';
import treeLevel1Gray from '../../../../assets/images/tree/nivel_1/nivel_1_descubierta.png';
import treeLevel1Color from '../../../../assets/images/tree/nivel_1/nivel_1_color.png';
import { FLORECIDA } from '../../../constants';
import WoodLabel from '../WoodLabel/WoodLabel';
import { neuron } from '../../utils';

const treeHeight = 371;
const treeWidth = 213;
const aspect = treeWidth / treeHeight;

const TreeLevel = styled(ImageBackground)`
  width: ${props => props.width};
  height: ${props => Math.round(props.width / aspect)};
  position: absolute;
  bottom: 50;
  align-self: center;
  overflow: visible;
`;

const Container = styled(View)`
  position: relative;
  flex: 1;
  overflow: visible;
  align-items: center;
`;

export default class Level1 extends Component {
  static defaultProps = {
    width: 50,
  }

  static propTypes = {
    width: PropTypes.number,
    userTree: PropTypes.object,
    children: PropTypes.any,
  }

  state = {
    showLabel: false,
  }

  onPressPlayContent = () => {
    const { tree } = this.props.userTree;
    Actions.content({ title: tree.root.title, neuron_id: tree.root.id });
  }

  onPressNeuron = () => {
    this.setState(prevState => ({ showLabel: !prevState.showLabel }));
  }

  render() {
    const { showLabel } = this.state;
    const { width, userTree, children } = this.props;
    const { tree } = userTree;

    const contentsLearned = tree.root.learnt_contents || 0;
    const totalContents = tree.root.total_approved_contents || 0;

    const treeColor = tree.root.state === FLORECIDA ? treeLevel1Color : treeLevel1Gray;
    const neuronColor = tree.root.state === FLORECIDA && 'yellow';
    const NEURON_MIN_SIZE = 50;
    const NEURON_MAX_SIZE = 80;
    const neuronSize = neuron.calculateSize({
      contentsLearned,
      totalContents,
      size: {
        min: NEURON_MIN_SIZE,
        max: NEURON_MAX_SIZE
      }
    });

    return (
      <Container>
        {children}
        <TreeLevel
          width={width}
          source={treeColor}
          resizeMode='contain'
        >
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          {showLabel &&
            <WoodLabel
              style={{ position: 'absolute', top: -(neuronSize) - 20 }}
              text={tree.root.title}
              onPress={this.onPressPlayContent}
            />}
          <Neuron
            onPress={this.onPressNeuron}
            color={neuronColor}
            name={tree.root.title}
            id={tree.root.id}
            contentsLearned={contentsLearned}
            totalContents={totalContents}
            size={{ max: 80, min: 50 }}
            position={{ top: -25, left: -8 }}
          />
        </View>
        </TreeLevel>
      </Container>
    );
  }
}
