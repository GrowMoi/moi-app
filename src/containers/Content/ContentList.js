import React, { Component } from 'react';
import styled from 'styled-components/native';
import {
  ScrollView,
  View,
  FlatList,
  Alert,
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Actions, ActionConst } from 'react-native-router-flux';
import * as Animatable from 'react-native-animatable';
import uuid from 'uuid/v4';

// Common Components
import Navbar from '../../commons/components/Navbar/Navbar';
import MoiBackground from '../../commons/components/Background/MoiBackground';
import { ContentPreview, ContentBox } from '../../commons/components/ContentComponents';
import { BottomBarWithButtons } from '../../commons/components/SceneComponents';
import Preloader from '../../commons/components/Preloader/Preloader';
import { normalize } from '../../commons/utils';
import { Size } from '../../commons/styles';
import { Header } from '../../commons/components/Typography';
import ContentListBox from './ContentListBox';

// Actions
import neuronActions from '../../actions/neuronActions';
import userActions from '../../actions/userActions';

const Container = styled(View)`
  flex: 1;
  align-items: center;
  justify-content: center;
`
const ContentPreviewAnimatable = Animatable.createAnimatableComponent(ContentPreview);

@connect(store => ({
  neuronSelected: store.neuron.neuronSelected,
  device: store.device,
  route: store.route,
}),
{
  loadNeuronByIdAsync: neuronActions.loadNeuronByIdAsync,
})
export default class ContentListScene extends Component {
  state = {
    loading: true,
  }

  async componentDidMount() {
    await this.getCurrentContents();
    this.setState({ loading: false });
  }

  getCurrentContents = async () => {
    const { loadNeuronByIdAsync, neuron_id } = this.props;

    try {
      await loadNeuronByIdAsync(neuron_id);
    } catch (error) {
      console.log(error.message);
    }
  }

  render() {
    const { loading } = this.state;
    const { neuronSelected, device, neuron_id } = this.props;

    const containerStyles = {
      width: (device.dimensions.width - Size.spaceMediumLarge),
      paddingHorizontal: Size.spaceSmall,
    };

    return (
      <MoiBackground>
        {!loading ? (
          <ContentListBox
            containerStyles={containerStyles}
            neuronSelected={neuronSelected}
            neuronId={neuron_id}
          />
        ) : (
          <Preloader />
        )}

        <Navbar />
        <BottomBarWithButtons
          readButton={false}
          width={device.dimensions.width}
        />
      </MoiBackground>
    );
  }
}

ContentListScene.propTypes = {
  title: PropTypes.string,
  neuronSelected: PropTypes.object,
  neuron_id: PropTypes.number,
  device: PropTypes.object,
};
