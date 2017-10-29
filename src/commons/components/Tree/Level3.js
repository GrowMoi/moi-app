import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import { View, Image } from 'react-native';
import styled from 'styled-components/native';
import { getHeightAspectRatio } from '../../utils';
import { FLORECIDA } from '../../../constants';
import Neuron, { NeuronContainer } from './Neuron';

// configs
import secondLevelConfig from './neuronConfigs/level2.config';
import thirdLevelConfig from './neuronConfigs/level3.config';

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

const FloweredBranch = TreeBase.extend``;
// const NeuronContainer = styled(View)``;

const Levels = styled(View)`
  position: relative;
  align-items: center;
  flex: 1;
  overflow: visible;
`;

const NeuronsLayer = styled(View)`
  width: 300;
  height: 140;
  position: absolute;
  bottom: 50;
`;

const neuronCommonProps = {
  size: {
    max: 30,
    min: 20,
  },
};


export default class Level3 extends Component {
  state = {
    floweredBranches: [],
    currenTreeWidth: 500,
    neuronsLayer: [],
  }

  componentWillMount() {
    this.setState({
      neuronsLayer: [
        this.renderLevel1(),
        this.renderLevel2(),
      ],
    });
  }

  addFloweredBranch = (floweredBranchs, id) => {
    const { currenTreeWidth } = this.state;
    const branchProps = {
      resizeMode: 'contain',
      width: currenTreeWidth,
    };


    const branchs = floweredBranchs.map((branch, i) => {
      return (
        <FloweredBranch
          key={`flowered-branch-level3-${id}-${i}`}
          source={branch}
          {...branchProps}
        />
      );
    });

    this.setState(prevState => ({
      floweredBranches: prevState.floweredBranches.concat(branchs),
    }));
  }

  onPressNeuron = (e, data) => {
    Actions.content({ title: data.title, neuron_id: data.id });
  }

  renderLevel1 = () => {
    const { userTree: { tree } } = this.props;

    const contentsLearned = tree.root.learnt_contents;
    const totalContents = tree.root.total_approved_contents;
    const neuronColor = tree.root.state === FLORECIDA && 'yellow';

    return (
      <Neuron
        key={`neuron-level1-${tree.root.id}`}
        id={tree.root.id}
        onPress={e => this.onPressNeuron(e, tree)}
        color={neuronColor}
        name={tree.root.title}
        contentsLearned={contentsLearned}
        totalContents={totalContents}
        position={{ bottom: 16, left: 125 }}
        {...neuronCommonProps}
      />
    );
  }

  renderLevel2 = () => {
    const { userTree: { tree } } = this.props;

    const renderNeuron = (branchDirection, neuron) => {
      const level2Config = secondLevelConfig[branchDirection];
      const level3Config = thirdLevelConfig[branchDirection];
      const hasChildren = neuron.children.length;

      const neuronComponent = (
        <Neuron
          key={`neuron-level2-${neuron.id}`}
          onPress={e => this.onPressNeuron(e, neuron)}
          id={neuron.id}
          name={neuron.title}
          contentsLearned={neuron.learnt_contents}
          totalContents={neuron.total_approved_contents}
          position={hasChildren ? {} : level2Config.level3.position}
          { ...level2Config.neuron }
          { ...neuronCommonProps }
        />
      );

      if (hasChildren && hasChildren > 0) {
        const children = neuron.children.map((child, i) => {
          const isFlowered = child.state === FLORECIDA;

          if (isFlowered) {
            this.addFloweredBranch(level3Config.level3[i].floweredImg, child.id);
          }

          return (
            <Neuron
              id={child.id}
              key={`neuron-level3-${child.id}`}
              name={child.title}
              onPress={(e) => this.onPressNeuron(e, child)}
              contentsLearned={child.learnt_contents}
              totalContents={child.total_approved_contents}
              position={level3Config.level3[i].position}
              { ...neuronCommonProps }
              { ...level3Config.neuron }
            />
          );
        });

        return (
          <NeuronContainer
            key={`branch-level3-${neuron.id}`}
            pos={level2Config.level3.position}
            size={neuronCommonProps.size.max}
          >
            {neuronComponent}
            {children}
          </NeuronContainer>
        );
      }

      return neuronComponent;
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
    const { floweredBranches, currenTreeWidth, neuronsLayer } = this.state;
    const { userTree: { tree, meta } } = this.props;

    const defaultProps = {
      resizeMode: 'contain',
      width: currenTreeWidth,
    };

    return (
      <Container>
        {!!tree && (
          <Levels>
            <TreeBase source={arbolNivel3Gris} {...defaultProps} />
            {floweredBranches}
            <TreeBase source={arbolColorNivel2} {...defaultProps} />
            <NeuronsLayer>
              {neuronsLayer}
            </NeuronsLayer>
          </Levels>
        )}
      </Container>
    );
  }
}

Level3.propTypes = {
  userTree: PropTypes.object,
  device: PropTypes.object,
};