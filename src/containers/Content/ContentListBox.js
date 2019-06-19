import React, { PureComponent } from 'react';
import { ScrollView, AsyncStorage, FlatList } from 'react-native';
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
  neuronSelected: store.neuron.neuronSelected,
  device: store.device,
  route: store.route,
  scene: store.routes.scene,
}), {
    getEventsTodayAsync: userActions.getEventsTodayAsync,
})
export default class ContentListBox extends PureComponent {

  state = {
    isAlertOpen: true,
    events: [],
    isFirstTimeEvents: false,
  }

  previousScene;
  widthContentPreview;

  constructor(props) {
    super(props);
    this.backToTree = this.backToTree.bind(this);
    this.previousScene = null;
  }

  async componentWillMount() {
    const { device: { dimensions: { width } } } = this.props;
    const isFirstTime = await this.fistTimeOfTheDay();
    this.widthContentPreview = width > 320 ? 110 : 100;
    this.setState({ isFirstTimeEvents: isFirstTime });
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

   async fistTimeOfTheDay() {
    const dateEventShown = await AsyncStorage.getItem('dateEventShown');
    const today = this.getTodayDate();
    if(today !== dateEventShown) {
      await AsyncStorage.setItem('dateEventShown', today);
    }
    return today !== dateEventShown;
  }

  getTodayDate() {
    var day = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    return `${year}-${month}-${day}`;
  }

  backToTree() {
    this.setState({ isAlertOpen: false });
    // Actions.tree({type: ActionConst.RESET});
    Actions.pop();
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

  _keyExtractor = (item, index) => index.toString();

  render() {
    const { containerStyles, device: { dimensions: { width } }, neuronSelected, scene } = this.props;
    const { isAlertOpen, events, isFirstTimeEvents } = this.state;

    const contents = this.filterReadedContents((neuronSelected || {}).contents);
    const existContentsToRead = (contents || []).length > 0;

    const isContetScene = this.isContetScene;
    const showEvents = events && events.length > 0 && isFirstTimeEvents;

    return (
      <ContentBox>
        <FlatList
          contentContainerStyle={containerStyles}
          data={contents || []}
          renderItem={this._renderItem}
          keyExtractor={this._keyExtractor}
          numColumns={1}
        />

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
