import React, { Component } from 'react';
import { View } from 'react-native';

export default class NeuronMap extends Component {
  state = {
    visible: true,
  }

  componentDidMount() {
    const { neurons } = this.props;
    const neuron = this.getAllNeurons(neurons);
    console.log(neuron);
  }

  getAllNeurons = (neurons) => {
    if (neurons.children.length) {
      return neurons.children.map((neuron) => {
        this.getAllNeurons(neuron);
        return neuron;
      });
    }
  }

  render() {
    const { neurons } = this.props;

    if (neurons.children.length > 0) {
      childNodes = neurons.children.map((neuron, index) => {
        return <View key={index}><NeuronMap neurons={neuron} /></View>;
      });
    }

    return (
      <View>
      </View>
    );
  }
}
