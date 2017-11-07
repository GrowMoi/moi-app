import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { View, Image } from 'react-native';
import Neuron, { NeuronContainer } from './Neuron';
import { getHeightAspectRatio } from '../../utils';

import { FLORECIDA } from '../../../constants';
import levelsConfig from './neuronConfigs/levels.config';

const Container = styled(View)`
  width: ${({ width }) => width};
  height: ${({ treeDimensions: { width: _width, height }, width }) => getHeightAspectRatio(_width, height, width)};
  position: absolute;
  bottom: 50;
  overflow: visible;
`;

const RecursiveNeuron = ({
  neuron,
  level = 2,
  maxLevel,
  configs,
  index = 0,
  size = {},
  parentIndex = 0,
}) => {
  let children;

  const maximunGrowSize = size.max || 30;
  const minimunSize = size.min || 20;

  const parentIndexExistInConfigs = `${parentIndex}` in configs[`level${level}`];
  const indexExistInConfigs = parentIndexExistInConfigs && `${index}` in configs[`level${level}`][parentIndex];

  const neuronProps = {
    id: neuron.id,
    name: neuron.title,
    contentsLearned: neuron.learnt_contents,
    totalContents: neuron.total_approved_contents,
    color: configs.neuron.color,
    size: { max: maximunGrowSize, min: minimunSize },
  };

  if (neuron.children && neuron.children.length) {
    children = neuron.children.map((child, childIndex) => {
      if (level === maxLevel) return null;
      return (
        <RecursiveNeuron
          key={`neuron-${child.parent_id}-${child.id}-${child.title}`}
          neuron={child}
          level={level + 1}
          maxLevel={maxLevel}
          configs={configs}
          size={size}
          parentIndex={index}
          index={childIndex}
        />
      );
    });
  }

  return (
    <NeuronContainer
      key={`neuron-${neuron.id}-${neuron.title}`}
      pos={indexExistInConfigs ? configs[`level${level}`][parentIndex][index].position : {}}
    >
      <Neuron {...neuronProps} />
      {children}
    </NeuronContainer>
  );
};

export default class NeuronsLayer extends Component {
  size = { max: 18, min: 12 }
  branches = [];

  get renderLevelOne() {
    const { data } = this.props;

    const contentsLearned = data.root.learnt_contents;
    const totalContents = data.root.total_approved_contents;
    const color = data.root.state === FLORECIDA && 'yellow';

    const props = {
      key: `neuron-level1-${data.root.id}`,
      id: data.root.id,
      color,
      contentsLearned,
      totalContents,
      position: { bottom: 10, left: 145 },
      size: this.size,
    };

    return (
      <Neuron {...props}/>
    );
  }

  renderNeuronByDirection = (direction, data) => {
    const levelConfig = levelsConfig[direction];

    return (
      <RecursiveNeuron
        size={this.size}
        key={`${direction}`}
        neuron={data}
        maxLevel={4}
        configs={levelConfig}
      />
    );
  }

  renderLevels = () => {
    const { data: { root } } = this.props;

    const neurons = root.children.map((child, i) => {
      if (i === 0) return this.renderNeuronByDirection('left', child, i);
      else if (i === 1) return this.renderNeuronByDirection('leftCenter', child, i);
      else if (i === 2) return this.renderNeuronByDirection('rightCenter', child, i);
      else if (i === 3) return this.renderNeuronByDirection('right', child, i);
    });

    return neurons;
  }

  render() {
    const { treeDimensions, width } = this.props;

    return (
      <Container width={width} treeDimensions={treeDimensions}>
        {this.renderLevelOne}
        {this.renderLevels()}
      </Container>
    );
  }
}


NeuronsLayer.propTypes = {
  data: PropTypes.object,
  width: PropTypes.number,
  level: PropTypes.number,
  treeDimensions: PropTypes.shape({
    width: PropTypes.number,
    height: PropTypes.number,
  }),
};
