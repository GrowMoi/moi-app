import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import Navbar from '../../commons/components/Navbar/Navbar';
import MoiBackground from '../../commons/components/Background/MoiBackground';
import actions from '../../actions/neuronActions';
import { ContentPreview, ContentBox } from '../../commons/components/ContentComponents';
import { BottomBar } from '../../commons/components/SceneComponents';
import { normalize } from '../../commons/utils';

@connect(store => ({
  neuronSelected: store.neuron.neuronSelected,
}),
{
  loadNeuronByIdAsync: actions.loadNeuronByIdAsync,
})
export default class ContentListScene extends Component {
  state = {
    loading: true,
  }

  async componentDidMount() {
    const { loadNeuronByIdAsync } = this.props;
    await loadNeuronByIdAsync(1);

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
    const { neuronSelected } = this.props;

    return (
      <MoiBackground>
        <ContentBox>
          {!loading && neuronSelected.neuron.contents.map((content, i) => {
            const normalizeKind = `¿${normalize.normalizeFirstCapLetter(content.kind)}?`;
            const oddInverted = i % 2 === 1;

            return (
              <ContentPreview
                onPress={e => this.onPressRowcontent(e, content)}
                inverted={oddInverted}
                key={content.id}
                title={content.title}
                subtitle={normalizeKind}
                source={{ uri: content.media[0] }}
              />
            );
          })}
        </ContentBox>
        <Navbar/>
        <BottomBar />
      </MoiBackground>
    );
  }
}

ContentListScene.propTypes = {
  title: PropTypes.string,
  neuronSelected: PropTypes.object,
};
