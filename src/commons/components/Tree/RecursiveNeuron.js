import React, { Component } from 'react';
import Neuron, { NeuronContainer } from './Neuron';
import { connect } from 'react-redux';
import neuronActions from '../../../actions/neuronActions';

class _RecursiveNeuron extends Component {
  onPressNeuron = ({ measure, neuron }) => {
    const { setNeuronLabelInfo, label } = this.props;

    if(neuron.id === label.id) {
      setNeuronLabelInfo({});
      return;
    }
    setNeuronLabelInfo({ ...measure, ...neuron });
  }

  render() {
    const {
      neuron,
      level = 2,
      maxLevel,
      configs,
      index = 0,
      size = {},
      parentIndex = 0,
      parentLevel = 2,
      path = '',
    } = this.props;

    let children;

    const maximunGrowSize = size.max || 30;
    const minimunSize = size.min || 20;

    const neuronProps = {
      id: neuron.id,
      name: neuron.title,
      contentsLearned: neuron.learnt_contents,
      totalContents: neuron.total_approved_contents,
      color: configs.neuron.color,
      size: { max: maximunGrowSize, min: minimunSize },
      onPress: measure => this.onPressNeuron({ measure, neuron }),
    };

    let newPath;
    if (path) {
      newPath = `${path}.${level}.${index}`;
    } else {
      newPath = `${level}.${index}`;
    }

    // console.log(newPath);

    const neuronPosition = newPath in configs ? configs[newPath].position : {};
    //FIXME: delete once complete reposition of neurons
    // console.log('Path', newPath)
    // console.log('Neuron', neuron)
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
            parentLevel={level}
            path={newPath}
          />
        );
      });
    }

    return (
      <NeuronContainer
        key={`neuron-${neuron.id}-${newPath}-${neuron.title}`}
        pos={neuronPosition}
      >
        <Neuron {...neuronProps} />
        {children}
      </NeuronContainer>
    );
  }
};

const RecursiveNeuron = connect(state => ({
  label: state.neuron.currentlyPressed,
}), {
  setNeuronLabelInfo: neuronActions.setNeuronLabelInfo,
})(
  _RecursiveNeuron
)

export default RecursiveNeuron;
