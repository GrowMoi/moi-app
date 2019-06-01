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
import userActions from '../../actions/userActions';
import EventModal from '../Events/EventModal';
import eventsUtils from '../Events/events-utils';

@connect(store => ({
  neuronSelected: store.neuron.neuronSelected,
  device: store.device,
  route: store.route,
  scene: store.routes.scene,
}), {
    getEventsTodayAsync: userActions.getEventsTodayAsync,
})
export default class ContentListBox extends Component {

  state = {
    isAlertOpen: true,
    events: [],
  }

  previousScene;

  constructor(props) {
    super(props);
    this.backToTree = this.backToTree.bind(this);
    this.previousScene = null;
  }

  async componentDidMount() {
      const { getEventsTodayAsync } = this.props;
      const events = await getEventsTodayAsync();
      this.setState({events: eventsUtils.mergeEvents(events)})
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

  get isContetScene() {
    const { scene } = this.props;
    const isContent =  scene.name === 'content' || this.previousScene === 'singleContent' && scene.name === 'moiDrawer';

    this.previousScene = scene.name;

    return isContent;
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
        source={{ uri: content.media[0] }}
      />
    );
  }

  render() {
    const { containerStyles, device: { dimensions: { width } }, neuronSelected, scene } = this.props;
    const { isAlertOpen, events } = this.state;
    const widthContentPreview = width > 320 ? 110 : 100;
    const MILLISECONDS = 100;

    const contents = this.filterReadedContents((neuronSelected || {}).contents);
    const existContentsToRead = (contents || []).length > 0;

    const isContetScene = this.isContetScene;
    const showEvents = events && events.length > 0;

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

        {showEvents && existContentsToRead && <EventModal width={width} events={events} onCloseButtonPress={() => {this.setState({events: []})}}/>}

        {!existContentsToRead && isContetScene && <Alert open={isAlertOpen}>
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
