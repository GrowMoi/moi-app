import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Image } from 'react-native';
import { connect } from 'react-redux';
import styled from 'styled-components/native';
import { getHeightAspectRatio } from '../../utils';
import { PORTRAIT, FLORECIDA } from '../../../constants';
import Neuron from './Neuron';
import secondLevelConfig from './neuronConfigs/level2.config';

import arbolNivel3Gris from '../../../../assets/images/tree/arbol_adulto/gris/arbol_nivel3_gris.png';
import arbolColorNivel2 from '../../../../assets/images/tree/arbol_adulto/nivel_2/arbol_nivel2_color.png';

const Container = styled(View)`
  flex: 1;
  position: relative;
`;

const treeBaseWidth = 1000;
const treeBaseHeight = 845;

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
  position: relative;
  align-items: center;
  bottom: 0;
  width: ${props => props.width};
  flex: 1;
  overflow: visible;
`;

const Level2Container = styled(View)`
  width: 140;
  height: 100;
  position: absolute;
  bottom: 0;
`;

const neuronCommonProps = {
  size: {
    max: 30,
    min: 5,
  },
};

@connect(store => ({ device: store.device }))
export default class Level3 extends Component {
  renderLevel1 = () => {
    const { userTree: { tree, meta } } = this.props;

    const contentsLearned = tree.root.learnt_contents;
    const totalContents = tree.root.total_approved_contents;
    const neuronColor = tree.root.state === FLORECIDA && 'yellow';

    return (
      <Neuron
        key={tree.root.id}
        onPress={this.onPressNeuron}
        color={neuronColor}
        name={tree.root.title}
        contentsLearned={contentsLearned}
        totalContents={totalContents}
        position={{ left: 47, bottom: 16 }}
        {...neuronCommonProps}
      />
    )
  }
  renderLevel2 = () => {
    const { userTree: { tree, meta } } = this.props;

    const renderNeuron = (branchDirection, neuron, index) => {
      const isflorecida = neuron.state === FLORECIDA;
      const currentConfig = secondLevelConfig[branchDirection];

      return (
        <Neuron
          key={neuron.id}
          id={neuron.id}
          name={neuron.title}
          contentsLearned={neuron.learnt_contents}
          totalContents={neuron.total_approved_contents}
          position={currentConfig.level3.position}
          { ...currentConfig.neuron }
          { ...neuronCommonProps }
        />
      );
    };

    const neurons = tree.root.children.map((child, i) => {
      if (i === 0) return renderNeuron('left', child, i);
      else if (i === 1) return renderNeuron('leftCenter', child, i);
      else if (i === 2) return renderNeuron('rightCenter', child, i);
      else if (i === 3) return renderNeuron('right', child, i);
    });

    return neurons;
  }

  render() {
    const { userTree: { tree }, device } = this.props;
    const { dimensions: { width, height, orientation } } = device;

    const defaultProps = {
      resizeMode: 'contain',
      width: orientation === PORTRAIT ? 500 : width,
      // width: orientation === PORTRAIT ? width : 320,
    };

    return (
      <Container>
        {!!tree && (
          <Levels width={width}>
            <TreeBase source={arbolNivel3Gris} zIndex={0} {...defaultProps}>
            </TreeBase>
            <TreeBase source={arbolColorNivel2} zIndex={1} {...defaultProps}>
              <Level2Container>
                {this.renderLevel1()}
                {this.renderLevel2()}
              </Level2Container>
            </TreeBase>
          </Levels>
        )}
      </Container>
    );
  }
}

Level3.propTypes = {
  userTree: PropTypes.object,
};
