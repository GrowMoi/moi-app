import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import Navbar from '../../commons/components/Navbar/Navbar';
import MoiBackground from '../../commons/components/Background/MoiBackground';
import actions from '../../actions/neuronActions';
import { ContentPreview, ContentBox } from '../../commons/components/ContentComponents';
import { BottomBarWithButtons } from '../../commons/components/SceneComponents';
import Preloader from '../../commons/components/Preloader/Preloader';
import { normalize } from '../../commons/utils';
import { Size } from '../../commons/styles';

@connect(store => ({
  neuronSelected: store.neuron.neuronSelected,
  device: store.device,
}),
{
  loadNeuronByIdAsync: actions.loadNeuronByIdAsync,
})
export default class ContentListScene extends Component {
  state = {
    loading: true,
  }

  componentDidMount() {
    this.getCurrentContents();
  }

  getCurrentContents = async () => {
    const { loadNeuronByIdAsync, neuron_id } = this.props;
    await loadNeuronByIdAsync(neuron_id);

    this.setState({ loading: false });
  }

  onPressRowcontent = (e, content) => {
    const { neuronSelected } = this.props;

    Actions.singleContent({
      content_id: content.id,
      title: neuronSelected.neuron.title,
    });
  }

  render() {
    const { loading } = this.state;
    const { neuronSelected, device } = this.props;
    const widthContentPreview = device.dimensions.width > 320 ? 150 : 100;

    const containerStyles = {
      width: (device.dimensions.width - Size.spaceLarge),
      paddingHorizontal: Size.spaceSmall,
    };

    return (
      <MoiBackground>
        {!loading ? (
          <ContentBox>
            <ScrollView contentContainerStyle={containerStyles}>
              {neuronSelected.neuron.contents.map((content, i) => {
                const normalizeKind = `¿${normalize.normalizeFirstCapLetter(content.kind)}?`;
                const oddInverted = i % 2 === 1;

                return (
                  <ContentPreview
                    width={widthContentPreview}
                    onPress={e => this.onPressRowcontent(e, content)}
                    inverted={oddInverted}
                    key={content.id}
                    title={content.title}
                    subtitle={normalizeKind}
                    source={{ uri: content.media[0] }}
                  />
                );
              })}
            </ScrollView>
          </ContentBox>
        ) : (
          <Preloader />
        )}

        <Navbar/>
        <BottomBarWithButtons width={device.dimensions.width} />
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
