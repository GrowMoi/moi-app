import React, { PureComponent } from 'react';
import { AsyncStorage } from 'react-native'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PassiveMessageAlert from '../../commons/components/Alert/PassiveMessageAlert'

// Common Components
import Navbar from '../../commons/components/Navbar/Navbar';
import MoiBackground from '../../commons/components/Background/MoiBackground';
import { BottomBarWithButtons } from '../../commons/components/SceneComponents';
import { Size } from '../../commons/styles';
import ContentListBox from './ContentListBox';
import eventsUtils from '../Events/events-utils';
import EventModal from '../Events/EventModal';

// Actions
import userActions from '../../actions/userActions';

@connect(state => ({
  device: state.device,
  showPassiveMessage: state.user.showPassiveMessage,
  neuronSelected: state.neuron.neuronSelected,
}), {
  showPassiveMessageAsync: userActions.showPassiveMessageAsync,
  getEventsTodayAsync: userActions.getEventsTodayAsync,
})
export default class ContentListScene extends PureComponent {
  state = {
    isFirstTimeEvents: true,
    events: [],
  }

  async componentDidMount() {
    const { getEventsTodayAsync } = this.props;
    const isFirstTime = await this.fistTimeOfTheDay();
    const events = await getEventsTodayAsync();

    this.setState({
      isFirstTimeEvents: isFirstTime,
      events: eventsUtils.mergeEvents(events),
    });
  }

  fistTimeOfTheDay = async () => {
    const dateEventShown = await AsyncStorage.getItem('dateEventShown');
    const today = this.getTodayDate();
    if(today !== dateEventShown) {
      await AsyncStorage.setItem('dateEventShown', today);
    }
    return today !== dateEventShown;
  }

  getTodayDate = () => {
    var day = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    return `${year}-${month}-${day}`;
  }

  filterReadedContents = (contents = []) => {
    return contents.filter(d => (!d.read || d.learnt));
  }

  render() {
    const { device, neuron_id, showPassiveMessage, showPassiveMessageAsync, neuronSelected } = this.props;
    const { events, isFirstTimeEvents } = this.state

    const showEvents = events && events.length > 0 && isFirstTimeEvents;
    const contents = this.filterReadedContents((neuronSelected || {}).contents);
    const existContentsToRead = (contents || []).length > 0;

    const containerStyles = {
      width: (device.dimensions.width - Size.spaceMediumLarge),
      paddingHorizontal: Size.spaceSmall,
    };

    return (
      <MoiBackground>
        <ContentListBox
          containerStyles={containerStyles}
          neuronId={neuron_id}
          contents={contents}
          neuronSelected={neuronSelected}
        />

        <Navbar />
        <BottomBarWithButtons
          readButton={false}
          width={device.dimensions.width}
        />

        {showEvents && (
          existContentsToRead && (
            <EventModal
              width={device.dimensions.width}
              events={events}
              onCloseButtonPress={() => {
                this.setState({ events: [] })
              }}/>
          )
        )}

        <PassiveMessageAlert
          isOpenPassiveMessage={showPassiveMessage}
          touchableProps={{
            onPress: () => {
              showPassiveMessageAsync(false);
            }
          }}
          message='Elige el contenido que más te interese y presiona sobre el'
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
