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
import userActions from '../../actions/userActions';


class RandomContents extends Component {
  state = {
    loading: true,
  }

  componentDidMount() {
    this.getRandomContents();
  }

  async componentWillReceiveProps(newProps) {
    if(newProps.reloadRandomContents && !this.state.loading) {
      this.setState({ loading: true });
      await this.getRandomContents();
      this.props.setReloadRandomContents(false);
    }
  }

  getRandomContents = async () => {
    const { loadRecomendedContents, loadRandomNeuronContentByIdAsync } = this.props;
    const { data } = await loadRecomendedContents(1);
    const neurons = (data.neurons || []);
    const randomNeuron = (neurons[Math.floor(Math.random() * neurons.length)] || {});
    Actions.refresh({title: randomNeuron.title});

    await loadRandomNeuronContentByIdAsync(randomNeuron.id || 1);
    this.setState({ loading: false });
  }

  onPressRowcontent = (e, content) => {
    Actions.singleContent({
      content_id: content.id,
      title: content.title,
      neuron_id: content.neuron_id,
    });
  }

  render() {
    const { loading } = this.state;
    const { device, randomNeuronSelected } = this.props;
    const widthContentPreview = device.dimensions.width > 320 ? 110 : 100;

    const containerStyles = {
      width: (device.dimensions.width - Size.spaceMediumLarge),
      paddingHorizontal: Size.spaceSmall,
    };

    const contentBox = !loading && (
      <ContentBox>
        {((randomNeuronSelected || {}).contents || []).map((content, i) => {
            const normalizeKind = `¿${normalize.normalizeFirstCapLetter(content.kind || '')}?`;
            const oddInverted = i % 2 === 1;

            const MILLISECONDS = 100;
            const delay = MILLISECONDS * i;

            return (
              <ContentPreview
                big
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


RandomContents.propTypes = {
  randomNeuronSelected: PropTypes.object,
  device: PropTypes.object,
  user: PropTypes.object,
  neuron_id: PropTypes.number,
};

const mapStateToProps = (state) => ({
  randomNeuronSelected: state.neuron.randomNeuronSelected,
  device: state.device,
  reloadRandomContents: state.user.reloadRandomContents,
})

const mapDispatchToProps = {
  loadRecomendedContents: neuronActions.loadRecomendedContents,
  loadRandomNeuronContentByIdAsync: neuronActions.loadRandomNeuronContentByIdAsync,
  setReloadRandomContents: userActions.setReloadRandomContents,
}

export default connect(mapStateToProps, mapDispatchToProps)(RandomContents);
