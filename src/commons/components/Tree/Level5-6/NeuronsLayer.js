import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { View } from 'react-native';
import Neuron, { NeuronContainer } from '../Neuron';
import { getHeightAspectRatio } from '../../../utils';

import { FLORECIDA } from '../../../../constants';
import secondLevelConfig from '../neuronConfigs/level2.config';
import thirdAndFourLevelConfig from '../neuronConfigs/level3-4.config';

const Container = styled(View)`
  width: ${({ width }) => width};
  height: ${({ treeDimensions: { width: _width, height }, width }) => getHeightAspectRatio(_width, height, width)};
  position: absolute;
  bottom: 50;
`;

// const maxLevel = 4;
const RecursiveNeuron = ({ neuron, depth = 2, maxLevel }) => {

  let children;
  const neuronProps = {
    id: neuron.id,
    name: neuron.title,
    contentsLearned: neuron.learnt_contents,
    totalContents: neuron.total_approved_contents,
  };

  if (neuron.children && neuron.children.length) {
    children = neuron.children.map((child) => {
      if (depth === maxLevel) return null;
      return <RecursiveNeuron key={`neuron-${child.parent_id}-${child.id}-${child.title}`} neuron={child} depth={depth + 1} maxLevel={maxLevel}/>;
    });
  }

  return (
    <NeuronContainer key={`neuron-${neuron.id}-${neuron.title}`} pos={{ bottom: 1, right: 20 }}>
      <Neuron {...neuronProps} />
      {children}
    </NeuronContainer>
  );
};

export default class NeuronsLayer extends Component {
  size = { max: 30, min: 20 }

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
      position: { bottom: 2, left: 140 },
      size: this.size,
    };

    return (
      <Neuron {...props}/>
    );
  }

  renderNeuronByDirection = (direction, data, index, configs) => {
    const level2Config = secondLevelConfig[direction];
    const level3Config = thirdAndFourLevelConfig[direction];

    const customProps = {
      index,
      direction,
      id: data.id,
      title: data.title,
      contentsLearned: data.learnt_contents,
      totalContents: data.total_approved_contents,
      position: data.children.length ? {} : level2Config['level5-6'].position,
    };

    return <RecursiveNeuron key={`${direction}`} neuron={data} maxLevel={4} />;
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
