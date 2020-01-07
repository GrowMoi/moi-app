import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import WoodLabel from '../WoodLabel/WoodLabel';
import neuronActions from '../../../actions/neuronActions'
import Preloader from '../Preloader/Preloader';
import deviceUtils from '../../utils/device-utils';
import { ActionConst } from 'react-native-router-flux'

const isTablet = deviceUtils.isTablet();

class LabelsLayer extends Component {

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
    Actions.content({ title: label.title, neuron_id: label.id, type: ActionConst.RESET });
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

    const neuronWidth = label.width;
    const isBigNeuron = neuronWidth >= (isTablet ? 160 : 80);
    const zoom = zoomScale === 3 ? 4 : zoomScale

    const zoomScaleValues = {
      1: isTablet ? 2.1 : 1.2,
      4: isTablet ? 1.2 + (zoomInfo.scale / 3) : 0.7 + (zoomInfo.scale / 5),
    }

    const topPositions = {
      1: isTablet ? -70 : -62,
      4: isTablet ? -75 : -65,//ok both
    }

    const leftPositions = {
      1: isTablet ? isBigNeuron ? 38 : 15 : isBigNeuron ? 3 : -15,
      4: isTablet ? - 21 : - 30,//ok both
    }

    return (
      <View style={{ flex: 1, position: 'absolute', top: 1, left: 1 }}>
        {label.pageX && label.pageY &&
          <WoodLabel
            text={label.title}
            onPress={() => {
              this.hideWoodLabel();
              this.playContent();
            }}
            style={{
              position: 'absolute',
              top: label.pageY + topPositions[zoom],
              left: label.pageX + leftPositions[zoom],
              transform: [{
                scale: zoomScaleValues[zoom],
              }],
            }}
          />
        }
        {loading && (<Preloader />)}
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  label: state.neuron.currentlyPressed,
  tree: state.tree.userTree,
  device: state.device,
  zoomInfo: state.tree.zoomInfo,
  zoomScale: state.tree.zoomScale,
})

const mapDispatchToProps = {
  setNeuronLabelInfo: neuronActions.setNeuronLabelInfo,
  loadNeuronByIdAsync: neuronActions.loadNeuronByIdAsync,
}

export default connect(mapStateToProps, mapDispatchToProps)(LabelsLayer)
