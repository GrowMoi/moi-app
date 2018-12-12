import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { connect } from 'react-redux';
import WoodLabel from '../WoodLabel/WoodLabel';
import neuronActions from '../../../actions/neuronActions'

@connect(state => ({
  label: state.neuron.currentlyPressed,
  device: state.device,
}), {
  setNeuronLabelInfo: neuronActions.setNeuronLabelInfo,
})
export default class LabelsLayer extends Component {
  hideWoodLabel = () => {
    const { setNeuronLabelInfo } = this.props;
    setNeuronLabelInfo({});
  }

  playContent = async () => {
    // const { label } = this.props;

    // await this.getCurrentContents(label.id);
    // Actions.content({ title: label.title, neuron_id: label.id });

    console.log('PLAY CONTENTS')
  }

  render() {
    const { label } = this.props;

    return (
      <View style={{ flex: 1, position: 'absolute', top: 0, left: 0 }}>
        {label.pageX && label.pageY &&
          <WoodLabel
            text={label.title}
            onPress={() => {
              this.hideWoodLabel();
              this.playContent();
            }}
            zoomScale={4}
            style={{
              position: 'absolute',
              top: label.pageY,
              left: label.pageX,
            }}
          />
        }
      </View>
    )
  }
}
