import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Image, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import styled from 'styled-components/native';
import Neuron from './Neuron';
import treeLevel1Gray from '../../../../assets/images/tree/nivel_1/nivel_1_descubierta.png';
import treeLevel1Color from '../../../../assets/images/tree/nivel_1/nivel_1_color.png';
import actions from '../../../actions/treeActions';

const treeHeight = 371;
const treeWidth = 213;
const aspect = treeWidth / treeHeight;

const TreeLevel1 = styled(Image)`
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
`;

@connect(store => ({
  userTree: store.tree.userTree,
}))
export default class Level1 extends Component {
  static defaultProps = {
    width: 50,
  }

  static propTypes = {
    width: PropTypes.number,
    userTree: PropTypes.object,
  }

  onPressNeuron = () => {
    const { tree } = this.props.userTree;
    setTimeout(() => {
      Actions.content({ title: tree.root.title, neuron_id: tree.root.id });
    }, 600);
  }

  render() {
    const { width, userTree } = this.props;
    const { tree } = userTree;
    const contentsLearned = tree.root.contentsLearned;
    const totalContents = tree.root.totalContents;
    const treeColor = tree.root.state === 'florecida' ? treeLevel1Color : treeLevel1Gray;
    const neuronColor = tree.root.state === 'florecida' && 'yellow';

    return (
      <Container>
        <TreeLevel1
          width={width}
          source={treeColor}
          resizeMode='contain'
        >
          <Neuron
            onPress={this.onPressNeuron}
            color={neuronColor}
            name={tree.root.title}
            id={tree.root.id}
            contentsLearned={contentsLearned}
            totalContents={totalContents}
            size={{ max: 50, min: 30 }}
            position={{ left: 7, bottom: 8 }}
          />
        </TreeLevel1>
      </Container>
    );
  }
}