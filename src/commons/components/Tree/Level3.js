import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import { View, Image } from 'react-native';
import styled, { css } from 'styled-components/native';
import { getHeightAspectRatio } from '../../utils';
import { FLORECIDA } from '../../../constants';
import Neuron, { NeuronContainer } from './Neuron';

// configs
import secondLevelConfig from './neuronConfigs/level2.config';
import thirdLevelConfig from './neuronConfigs/level3-4.config';


const Container = styled(View)`
  flex: 1;
  position: relative;
`;

const treeBaseWidth = 1000;
const treeBaseHeight = 845;
const BOTTOM_POSITON = 50;
const TreeBase = styled(Image)`
  position: absolute;
  bottom: ${BOTTOM_POSITON};
  width: ${props => props.width};
  height: ${props => getHeightAspectRatio(treeBaseWidth, treeBaseHeight, props.width)};
  z-index: ${props => props.zIndex || 0};
  overflow: visible;
  justify-content: center;
  align-items: center;
`;

const FloweredBranch = styled(View)`
  position: absolute;
  bottom: ${BOTTOM_POSITON};
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
  ${({ level }) => (level === 4 ? css`
    transform: scale(0.7);
    position: absolute;
    bottom: 15;
    left: 0;
    right: 0;
  ` : css`
    position: relative;
  `)}
`;

const NeuronsLayer = styled(View)`
  width: 300;
  height: 140;
  position: absolute;
  bottom: ${BOTTOM_POSITON};
  ${({ level }) => level >= 4 && css`
    transform: scale(0.9);
    width: 302;
    height: 154;
    bottom: 38;
  `};
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

  addFloweredBranch = (floweredBranches, id) => {
    const { currenTreeWidth } = this.state;
    const branchProps = {
      resizeMode: 'contain',
      width: currenTreeWidth,
    };

    if (floweredBranches && floweredBranches.length) {
      const branches = floweredBranches.map((branch, i) => (
        <FloweredBranch
          key={`flowered-branch-level3-${id}-${i}`}
          source={branch}
          {...branchProps}
        />
      ));

      this.setState(prevState => ({
        floweredBranches: prevState.floweredBranches.concat(branches),
      }));
    }
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

      const neuronComponent = (
        <Neuron
          key={`neuron-level2-${neuron.id}`}
          onPress={e => this.onPressNeuron(e, neuron)}
          id={neuron.id}
          name={neuron.title}
          contentsLearned={neuron.learnt_contents}
          totalContents={neuron.total_approved_contents}
          position={neuron.children.length ? {} : level2Config.level3.position}
          { ...level2Config.neuron }
          { ...neuronCommonProps }
        />
      );

      if (neuron.children && neuron.children.length) {
        const children = neuron.children.map((child, i) => {
          const isFlowered = child.state === FLORECIDA;

          const neuronChildrenLevel3 = (
            <Neuron
              id={child.id}
              key={`neuron-level3-${child.id}`}
              name={child.title}
              onPress={e => this.onPressNeuron(e, child)}
              contentsLearned={child.learnt_contents}
              totalContents={child.total_approved_contents}
              position={child.children.length ? {} : level3Config.level3[i].position}
              { ...neuronCommonProps }
              { ...level3Config.neuron }
            />
          );

          if (isFlowered) {
            this.addFloweredBranch(level3Config.level3[i].floweredImg, child.id);
          }

          if (child.children && child.children.length) {
            const childrenLevel4 = child.children.map((childLevel4, indexChildLevel4) => {
              const isFloweredLevel4 = childLevel4.state === FLORECIDA;

              if (isFloweredLevel4) {
                this.addFloweredBranch(
                  level3Config.level3[i].children[indexChildLevel4].floweredImg,
                  childLevel4.id,
                );
              }

              return (
                <Neuron
                  id={childLevel4.id}
                  key={`neuron-level4-${childLevel4.id}`}
                  name={childLevel4.title}
                  onPress={e => this.onPressNeuron(e, childLevel4)}
                  contentsLearned={childLevel4.learnt_contents}
                  totalContents={childLevel4.total_approved_contents}
                  position={level3Config.level3[i].children[indexChildLevel4].position}
                  { ...neuronCommonProps }
                  { ...level3Config.neuron }
                />
              );
            });

            return (
              <NeuronContainer
                key={`branch-level3-${child.id}`}
                pos={level3Config.level3[i].position}
                size={neuronCommonProps.size.max}
              >
                {neuronChildrenLevel3}
                <NeuronContainer
                  key={`branch-level4-${child.id}`}
                  size={neuronCommonProps.size.max}
                >
                  {childrenLevel4}
                </NeuronContainer>
              </NeuronContainer>
            );
          }

          return neuronChildrenLevel3;
        });

        return (
          <NeuronContainer
            key={`branch-level2-${neuron.id}`}
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
      // else if (i === 2) return renderNeuron('rightCenter', child, i);
      else if (i === 2) return renderNeuron('right', child, i);
    });

    return neurons;
  }

  render() {
    const { floweredBranches, currenTreeWidth, neuronsLayer } = this.state;
    const { userTree: { tree, meta: { depth } } } = this.props;
    const isLevel4 = depth === 4;

    const defaultProps = {
      resizeMode: 'contain',
      width: currenTreeWidth,
    };

    return (
      <Container>
        {!!tree && (
          <Levels level={depth}>
            <TreeBase source={{uri: isLevel4 ? 'arbol_nivel4_gris' : 'arbol_nivel3_gris'}} {...defaultProps} />
            {floweredBranches}
            <TreeBase source={{uri: 'arbol_nivel2_color'}} {...defaultProps} />
            <NeuronsLayer level={depth}>
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
