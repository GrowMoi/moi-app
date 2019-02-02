import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import WoodLabel from '../WoodLabel/WoodLabel';
import neuronActions from '../../../actions/neuronActions'
import Preloader from '../Preloader/Preloader';
@connect(state => ({
  label: state.neuron.currentlyPressed,
  tree: state.tree.userTree,
  device: state.device,
  zoomInfo: state.tree.zoomInfo,
  zoomScale: state.tree.zoomScale,
}), {
  setNeuronLabelInfo: neuronActions.setNeuronLabelInfo,
  loadNeuronByIdAsync: neuronActions.loadNeuronByIdAsync,
})
export default class LabelsLayer extends Component {

  state = {
    loading: false,
  }

  hideWoodLabel = () => {
    const { setNeuronLabelInfo } = this.props;
    setNeuronLabelInfo({});
  }

  playContent = async () => {
    const { label } = this.props;

    await this.getCurrentContents(label.id);
    Actions.content({ title: label.title, neuron_id: label.id });
  }

  getCurrentContents = async (neuronId) => {
    const { loadNeuronByIdAsync } = this.props;
    this.setState({ loading: true });
    try {
      await loadNeuronByIdAsync(neuronId);
      this.setState({ loading: false });

    } catch (error) {
      this.setState({ loading: false });
      console.log(error.message);
    }
  }

  render() {
    const { label, zoomScale, zoomInfo, tree: { meta: { depth } } } = this.props;
    const { loading } = this.state;

    const zoomValue = depth === 2 ? depth : zoomScale;
    let topPosition = zoomScale === 1 ? label.pageY - (label.height / 2) : label.pageY;
    topPosition = depth === 2 && label.height < 60 ? topPosition - 17 : topPosition;

    return (
      <View style={{ flex: 1, position: 'absolute', top: 0, left: 0 }}>
        {label.pageX && label.pageY &&
          <WoodLabel
            text={label.title}
            onPress={() => {
              this.hideWoodLabel();
              this.playContent();
            }}
            zoomScale={zoomValue}
            zoomInfo={zoomInfo}
            style={{
              position: 'absolute',
              top: topPosition,
              left: label.pageX + (label.width / 2),
            }}
          />
        }
        {loading && (<Preloader />)}
      </View>
    )
  }
}
