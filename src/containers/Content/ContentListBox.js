import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { ContentPreview, ContentBox } from '../../commons/components/ContentComponents';
import { connect } from 'react-redux';
import withSound from '../../commons/utils/withSound';
import userActions from '../../actions/userActions';

const MILLISECONDS = 60;
const ContentPreviewWithSound = withSound(ContentPreview);

@connect(store => ({
  device: store.device,
  scene: store.routes.scene,
}), {
  getEventsTodayAsync: userActions.getEventsTodayAsync,
})
export default class ContentListBox extends Component {
  widthContentPreview;

  componentWillMount() {
    const { device: { dimensions: { width } } } = this.props;
    this.widthContentPreview = width > 320 ? 110 : 100;
  }

  shouldComponentUpdate(nextProps) {
    const { neuronSelected, scene, device } = this.props;

    // Conditions FIXME: remove this conditions later.
    const isContentScene = (scene.name === nextProps.scene.name);
    const isSameNeuronSelected = (neuronSelected.id === nextProps.neuronSelected.id)
    const isDiferentOrientation = device.dimensions.orientation !== nextProps.device.dimensions.orientation

    if(isContentScene) {
      if(isSameNeuronSelected) {
        if(isDiferentOrientation) return true
        return false
      }
    }

    return true
  }

  onPressRowcontent = (content) => {
    const { neuronSelected, neuronId } = this.props;

    Actions.singleContent({
      content_id: content.id,
      neuron_id: neuronId,
      title: neuronSelected.title,
    });
  }

  _renderItem = ({ item, index }) => {
    const oddInverted = index % 2 === 1;
    const delay = MILLISECONDS * index;

    return (
      <ContentPreviewWithSound
        soundName="selectOption"
        learnt={item.learnt}
        animationDelay={delay}
        key={`item-${item.id}.${item.title}`}
        width={this.widthContentPreview}
        onPress={e => this.onPressRowcontent(item)}
        inverted={oddInverted}
        title={item.title || ''}
        source={{ uri: item.media[0] }}
      />
    );
  }

  _keyExtractor = (item) => {
    return `${item.id}.${item.kind}`
  };

  render() {
    const { containerStyles, contents = [] } = this.props;

    return (
      <ContentBox>
        <FlatList
          contentContainerStyle={containerStyles}
          data={contents}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
          numColumns={1}
        />
      </ContentBox>
    )
  }
}
