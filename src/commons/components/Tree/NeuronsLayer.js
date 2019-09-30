import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import styled from 'styled-components/native';
import { View } from 'react-native';
import { connect } from 'react-redux';
import Neuron from './Neuron';
import RecursiveNeuron from './RecursiveNeuron';
import { getHeightAspectRatio } from '../../utils';

import { FLORECIDA } from '../../../constants';
import levelsConfig from './neuronConfigs/levels.config';
import neuronActions from '../../../actions/neuronActions';

const Container = styled(View)`
  width: ${({ width }) => width};
  height: ${({ treeDimensions: { width: _width, height }, width }) => getHeightAspectRatio(_width, height, width)};
  position: absolute;
  overflow: visible;
`;

const onPressNeuron = (measure, _data) => {
  // Actions.content({ title: _data.title, neuron_id: _data.id });
};

const playContent = () => {

}
class NeuronsLayer extends Component {
  size = { max: 15, min: 8 }
  branches = [];

  onPressNeuron = ({ measure, neuron }) => {
    const { setNeuronLabelInfo, label } = this.props;

    if(neuron.id === label.id) {
      setNeuronLabelInfo({});
      return;
    }

    setNeuronLabelInfo({ ...measure, ...neuron });
  }

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
      position: { bottom: 10, left: 147 },
      size: this.size,
      onPress: measure => this.onPressNeuron({ measure, neuron: data.root }),
    };

    return (
      <Neuron {...props}/>
    );
  }

  renderNeuronByDirection = (direction, data) => {
    const levelConfig = levelsConfig[direction];
    const { level } = this.props;

    return (
      <RecursiveNeuron
        size={this.size}
        key={`${direction}`}
        neuron={data}
        maxLevel={level}
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

const mapStateToProps = (state) => ({
  label: state.neuron.currentlyPressed,
})

const mapDispatchToProps = {
  setNeuronLabelInfo: neuronActions.setNeuronLabelInfo,
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

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NeuronsLayer)
