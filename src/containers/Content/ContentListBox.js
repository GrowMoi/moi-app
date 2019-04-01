import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import uuid from 'uuid/v4';
import { ContentPreview, ContentBox } from '../../commons/components/ContentComponents';
import { normalize } from '../../commons/utils';
import EmptyState from '../../commons/components/EmptyState';
import { connect } from 'react-redux';
import Alert from '../../commons/components/Alert/Alert';
import GenericAlert from '../../commons/components/Alert/GenericAlert';
import withSound from '../../commons/utils/withSound';

@connect(store => ({
  neuronSelected: store.neuron.neuronSelected,
  device: store.device,
  route: store.route,
  scene: store.routes.scene,
}))
export default class ContentListBox extends Component {

  state = {
    isAlertOpen: true
  }

  constructor(props) {
    super(props);
    this.backToTree = this.backToTree.bind(this);
  }

  componentWillUpdate() {
    if (!this.state.isAlertOpen) {
      this.setState({ isAlertOpen: true });
    }
  }

  backToTree() {
    this.setState({ isAlertOpen: false });
    Actions.tree();
  }

  onPressRowcontent = (content) => {
    const { neuronSelected, neuronId } = this.props;

    Actions.singleContent({
      content_id: content.id,
      neuron_id: neuronId,
      title: neuronSelected.title,
    });
  }

  filterReadedContents = (contents = []) => {
    return contents.filter(d => (!d.read || d.learnt));
  }

  renderContentPreviewWithSound = (content, delay, oddInverted, widthContentPreview) => {
    const normalizeKind = `¿${normalize.normalizeFirstCapLetter(content.kind)}?`;
    const ContentPreviewWithSound = withSound(ContentPreview);

    return (
      <ContentPreviewWithSound
        soundName="selectOption"
        learnt={content.learnt}
        animationDelay={delay}
        key={`${uuid()}-${content.id}`}
        width={widthContentPreview}
        onPress={e => this.onPressRowcontent(content)}
        inverted={oddInverted}
        title={content.title || ''}
        subtitle={normalizeKind}
        source={{ uri: content.media[0] }}
      />
    );
  }

  render() {
    const { containerStyles, device, neuronSelected, scene } = this.props;
    const widthContentPreview = device.dimensions.width > 320 ? 110 : 100;
    const MILLISECONDS = 100;

    const contents = this.filterReadedContents((neuronSelected || {}).contents);
    const existContentsToRead = (contents || []).length > 0;

    return (
      <ContentBox>
        {existContentsToRead && (
          <ScrollView contentContainerStyle={containerStyles}>
            {(contents || []).map((content, i) => {
              const oddInverted = i % 2 === 1;
              const delay = MILLISECONDS * i;
              return this.renderContentPreviewWithSound(content, delay, oddInverted, widthContentPreview);
            })}
          </ScrollView>
        )}

        {!existContentsToRead && scene.name !== 'randomContents' && <Alert open={this.state.isAlertOpen}>
          <GenericAlert
            message='No hay contenidos!'
            description='Ya haz leido todos los contenidos en esta neurona.'
            onCancel={this.backToTree}
            cancelText='Ok'
          />
        </Alert>}
      </ContentBox>
    )
  }
}
