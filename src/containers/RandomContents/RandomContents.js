import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ScrollView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import MoiBackground from '../../commons/components/Background/MoiBackground';
import { ContentBox, ContentPreview } from '../../commons/components/ContentComponents';
import { Size } from '../../commons/styles';
import { normalize } from '../../commons/utils';
import Preloader from '../../commons/components/Preloader/Preloader';
import Navbar from '../../commons/components/Navbar/Navbar';
import { BottomBarWithButtons } from '../../commons/components/SceneComponents';
import neuronActions from '../../actions/neuronActions';


@connect(store => ({
  neuronSelected: store.neuron.neuronSelected,
  device: store.device,
  user: store.user,
}), {
  loadRecomendedContents: neuronActions.loadRecomendedContents,
  loadNeuronByIdAsync: neuronActions.loadNeuronByIdAsync,
})
class Tasks extends Component {
  state = {
    loading: true,
  }

  componentDidMount() {
    this.getRandomContents();
  }

  getRandomContents = async () => {
    const { loadRecomendedContents, loadNeuronByIdAsync } = this.props;
    const { data } = await loadRecomendedContents(1);
    const neurons = (data.neurons || []);
    const randomNeuron = (neurons[Math.floor(Math.random() * neurons.length)] || {});

    await loadNeuronByIdAsync(randomNeuron.id || 1);
    this.setState({ loading: false });
  }

  onPressRowcontent = (e, content) => {
    const { neuronSelected } = this.props;

    console.log(neuronSelected);

    Actions.singleContent({
      content_id: content.id,
      title: neuronSelected.title,
      neuron_id: content.neuron_id,
    });
  }

  render() {
    const { loading } = this.state;
    const { device, user: { tasks }, neuronSelected } = this.props;
    const widthContentPreview = device.dimensions.width > 320 ? 110 : 100;

    const containerStyles = {
      width: (device.dimensions.width - Size.spaceMediumLarge),
      paddingHorizontal: Size.spaceSmall,
    };

    const contentBox = !loading && (
      <ContentBox>
        <ScrollView contentContainerStyle={containerStyles}>
          {((neuronSelected || {}).contents || []).map((content, i) => {
              const normalizeKind = `¿${normalize.normalizeFirstCapLetter(content.kind || '')}?`;
              const oddInverted = i % 2 === 1;

              const MILLISECONDS = 100;
              const delay = MILLISECONDS * i;

              return (
                <ContentPreview
                  id={content.id}
                  animationDelay={delay}
                  width={widthContentPreview}
                  onPress={e => this.onPressRowcontent(e, content)}
                  inverted={oddInverted}
                  key={content.id}
                  title={content.title}
                  subtitle={normalizeKind}
                  source={{ uri: (content.media || [])[0] }}
                />
              );
            })
          }
        </ScrollView>
      </ContentBox>
    );

    return (
      <MoiBackground>
        {contentBox}
        {loading && <Preloader />}
        <Navbar />
        <BottomBarWithButtons width={device.dimensions.width} />
      </MoiBackground>
    );
  }
}

Tasks.propTypes = {
  neuronSelected: PropTypes.object,
  device: PropTypes.object,
  user: PropTypes.object,
  neuron_id: PropTypes.number,
};

export default Tasks;
