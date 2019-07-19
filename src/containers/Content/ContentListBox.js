import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { Actions, ActionConst } from 'react-native-router-flux';
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
import { View, Text } from 'react-native-animatable';

const MILLISECONDS = 100;

@connect(store => ({
  device: store.device,
  scene: store.routes.scene,
}), {
  getEventsTodayAsync: userActions.getEventsTodayAsync,
})
export default class ContentListBox extends Component {

  state = {
    isAlertOpen: true,
  }
  widthContentPreview;

  componentWillMount() {
    const { device: { dimensions: { width } } } = this.props;
    this.widthContentPreview = width > 320 ? 110 : 100;
  }

  componentWillUpdate() {
    if (!this.state.isAlertOpen) {
      this.setState({ isAlertOpen: true });
    }
  }

  shouldComponentUpdate(nextProps) {
    const { neuronSelected, scene, device } = this.props;

    // Conditions FIXME: remove this conditions later.
    const isContentScene = (this.props.scene.name === nextProps.scene.name);
    const isSameNeuronSelected = (this.props.neuronSelected.id === nextProps.neuronSelected.id)
    const isDiferentOrientation = device.dimensions.orientation !== nextProps.device.dimensions.orientation

    if(isContentScene) {
      if(isSameNeuronSelected) {
        if(isDiferentOrientation) return true
        return false
      }
    }

    return true
  }

  onCancelAlert = () => {
    this.setState(
      () => ({ isAlertOpen: false }),
      () => {
        // Actions.pop();
      }
    );
  }

  onPressRowcontent = (content) => {
    const { neuronSelected, neuronId } = this.props;

    Actions.singleContent({
      content_id: content.id,
      neuron_id: neuronId,
      title: neuronSelected.title,
    });
  }


  renderContentPreviewWithSound = (content, delay, oddInverted) => {
    // const normalizeKind = `¿${normalize.normalizeFirstCapLetter(content.kind)}?`;
    const ContentPreviewWithSound = withSound(ContentPreview);

    return (
      <ContentPreviewWithSound
        soundName="selectOption"
        learnt={content.learnt}
        animationDelay={delay}
        key={`item-${content.id}`}
        width={this.widthContentPreview}
        onPress={e => this.onPressRowcontent(content)}
        inverted={oddInverted}
        title={content.title || ''}
        source={{ uri: content.media[0] }}
      />
    );
  }

  _renderItem = ({ item, index }) => {
    const oddInverted = index % 2 === 1;
    const delay = MILLISECONDS * index;
    return this.renderContentPreviewWithSound(item, delay, oddInverted);
  }

  _keyExtractor = (item) => {
    return `${item.id}.${item.kind}`
  };

  render() {
    const { containerStyles, device: { dimensions: { width } }, neuronSelected, contents } = this.props;
    const { isAlertOpen } = this.state;

    const existContentsToRead = (contents || []).length > 0;
    // const contents = this.filterReadedContents((neuronSelected || {}).contents);

    // const isContentScene = scene.name === 'content';
    // const showEvents = events && events.length > 0 && isFirstTimeEvents;
    return (
      <ContentBox>
        <FlatList
          contentContainerStyle={containerStyles}
          data={contents || []}
          renderItem={this._renderItem}
          keyExtractor={this._keyExtractor}
          numColumns={1}
        />

        {/* {showEvents && existContentsToRead && <EventModal width={width} events={events} onCloseButtonPress={() => {this.setState({events: []})}}/>} */}

        {!existContentsToRead &&
          <Alert open={isAlertOpen}>
            <GenericAlert
              message='No hay contenidos!'
              description='Ya haz leido todos los contenidos en esta neurona.'
              onCancel={this.onCancelAlert}
              cancelText='Ok'
            />
          </Alert>
        }
      </ContentBox>
    )
  }
}
