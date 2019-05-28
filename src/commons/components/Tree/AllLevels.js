import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Image, TouchableWithoutFeedback } from 'react-native';
import styled from 'styled-components/native';
import { connect } from 'react-redux';
import { getHeightAspectRatio } from '../../utils';
import NeuronsLayer from './NeuronsLayer';
import neuronActions from '../../../actions/neuronActions';
import Branches from './allBranches';

const Container = styled(TouchableWithoutFeedback)`
  flex: 1;
  position: relative;
`;

const treeBaseWidth = 1417;
const treeBaseHeight = 1193;
const TreeBase = styled(Image)`
  position: absolute;
  bottom: 50;
  width: ${props => props.width};
  height: ${props => getHeightAspectRatio(treeBaseWidth, treeBaseHeight, props.width)};
  z-index: ${props => props.zIndex || 0};
  overflow: visible;
  justify-content: center;
  align-items: center;
`;

const Levels = styled(View)`
  align-items: center;
  flex: 1;
  overflow: visible;
`;

@connect(state => ({
  label: state.neuron.currentlyPressed,
  device: state.device,
}), {
  setNeuronLabelInfo: neuronActions.setNeuronLabelInfo,
})
export default class AllLevels extends Component {

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.userTree !== this.props.userTree;
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.device.dimensions.orientation !== this.props.device.dimensions.orientation) {
      this.props.setNeuronLabelInfo({});
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.userTree !== this.props.userTree;
  }

  hideWoodLabel = () => {
    const { setNeuronLabelInfo } = this.props;
    setNeuronLabelInfo({});
  }

  render() {
    const {
      userTree: { tree, meta: { depth } },
    } = this.props;
    console.log('sdfdfd');

    const isLevel4 = depth === 4;
    const isLevel3 = depth === 3;
    const isLevel5 = depth === 5;
    const isLevel6 = depth === 6;
    const isLevel7 = depth === 7;
    const isLevel8 = depth === 8;
    const isLevel9 = depth === 9;

    const CURRENT_TREE_WIDTH = 320;
    const defaultProps = {
      resizeMode: 'contain',
      width: CURRENT_TREE_WIDTH,
    };

    const treeDimensions = {
      width: treeBaseWidth,
      height: treeBaseHeight,
    };

    return (
      <Container onPress={this.hideWoodLabel}>
        <Levels>
          {isLevel5 && <TreeBase source={{uri: 'arbol_nivel5_gris'}} {...defaultProps}/>}
          {isLevel4 && <TreeBase source={{uri: 'arbol_nivel4_gris'}} {...defaultProps}/>}
          {isLevel3 && <TreeBase source={{uri: 'arbol_nivel4_gris'}} {...defaultProps}/>}
          {isLevel6 && <TreeBase source={{uri: 'arbol_nivel6_gris'}} {...defaultProps}/>}
          {isLevel7 && <TreeBase source={{uri: 'arbol_nivel7_gris'}} {...defaultProps}/>}
          {isLevel8 && <TreeBase source={{uri: 'arbol_nivel8_gris'}} {...defaultProps}/>}
          {isLevel9 && <TreeBase source={{uri: 'arbol_nivel9_gris'}} {...defaultProps}/>}
          <TreeBase source={{uri: 'arbol_nivel2_color'}} {...defaultProps}/>
          <Branches
            level={depth}
            data={tree}
            treeDimensions={treeDimensions}
            width={CURRENT_TREE_WIDTH}
          />
          <NeuronsLayer
            level={depth}
            data={tree}
            treeDimensions={treeDimensions}
            width={CURRENT_TREE_WIDTH}
          />
        </Levels>
      </Container>
    );
  }
}

AllLevels.propTypes = {
  userTree: PropTypes.object,
};
