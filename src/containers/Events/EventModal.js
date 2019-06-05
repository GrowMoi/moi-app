import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import styled from 'styled-components/native';
import Modal from 'expo/src/modal/Modal';
import GenericAlert from '../../commons/components/Alert/GenericAlert';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Palette } from '../../commons/styles';
import ListEvents from './ListEvents';
import ContentContainer from './ContentContainer';
import CloseIcon from './CloseIcon';
import EventInfo from './EventInfo';
import userActions from '../../actions/userActions';
import { Header } from '../../commons/components/Typography';

const Overlay = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.noOverlay ? 'transparent' : Palette.black.alpha(0.7).css()};
`;

const succesDescriptionEvent = 'Te uniste al evento con éxito, los contenidos que debes aprender están en la pestaña Tareas';
const succesDescriptionSuperEvent = 'Te uniste al super evento con éxito.';

@connect(store => ({}),
  {
    takeEventAsync: userActions.takeEventAsync,
    takeSuperEventAsync: userActions.takeSuperEventAsync,
    getEventInProgressAsync: userActions.getEventInProgressAsync,
    getEventsWeekAsync: userActions.getEventsWeekAsync,
  })
export default class EventModal extends Component {
  state = {
    showAlert: false,
    selectedEvent: null,
    events: [],
  }

  componentWillMount() {
    this.setState({ events: this.props.events });
  }

  onSelectEvent = event => {
    this.setState({ selectedEvent: event });
  }

  onPress = () => {
    if (this.state.selectedEvent) {
      this.onSelectEvent(null);
    } else {
      this.props.onCloseButtonPress();
    }
  }

  takeEvent = async () => {
    const { takeEventAsync, takeSuperEventAsync, getEventInProgressAsync, getEventsWeekAsync } = this.props;
    const { selectedEvent } = this.state;
    try {
      const isSuperEvent = selectedEvent.isSuperEvent;
      const takeEvent = isSuperEvent ? takeSuperEventAsync : takeEventAsync;
      await takeEvent(selectedEvent.id);
      await getEventInProgressAsync();
      await getEventsWeekAsync();
      this.setState({ showAlert: true, alertTitle: 'Success!!', alertDescription: isSuperEvent ? succesDescriptionSuperEvent : succesDescriptionEvent });
    } catch (error) {
      this.setState({ showAlert: true, alertTitle: 'Error!!', alertDescription: 'Hay un evento ya en curso' });
    }
  }

  hideAlert = async () => {
    if (this.state.alertTitle === 'Success!!') {
      await this.removeTakenEvent();
    }
    this.setState({ showAlert: false });
    this.verifyNoEvents();
  }

  removeTakenEvent = async () => {
    return await this.setState(prevState => ({
      events: prevState.events.filter(evt => evt !== prevState.selectedEvent),
      selectedEvent: null
    }));
  }

  verifyNoEvents = () => {
    if (this.state.events.length === 0) {
      this.props.onCloseButtonPress();
    }
  }

  get modalSize() {
    const { selectedEvent } = this.state;
    const width = this.eventModalWidth;

    return {
      width: selectedEvent ? width / 1.3 : width,
      height: selectedEvent ? 275 : 215,
    };
  }

  get colorsModal() {
    const { selectedEvent } = this.state;
    return {
      margin: selectedEvent ? ['#F9C488', '#D19D34'] : ['#CA9B22', '#F9C175'],
      content: selectedEvent ? ['#F7D4AA', '#E1BD70'] : ['#F8C57F', '#D09E24'],
    };
  }

  get eventModalWidth() {
    const { width } = this.props;
    return width > 500 ? 500 : width;
  }

  render() {
    const { open = true, animationType = 'slide', noOverlay = false } = this.props;
    const { selectedEvent, events, showAlert, alertTitle, alertDescription } = this.state;

    return (
      <Modal
        visible={open}
        transparent
        supportedOrientations={['portrait']}
        animationType={animationType}
        hardwareAccelerated
      >
        <Overlay noOverlay={noOverlay}>
          {!showAlert ?
            <View style={{ width: this.modalSize.width, height: this.modalSize.height, padding: 5, paddingTop: 10, alignItems: 'center' }}>
              <CloseIcon onPress={this.onPress} />
              <ContentContainer style={{ width: this.modalSize.width - 25, height: this.modalSize.height - 10 }} colorsMargin={this.colorsModal.margin} colorsContent={this.colorsModal.content} horizontalGradient={false}>
                {!selectedEvent && <Header bolder>Eventos</Header>}
                {selectedEvent ? <EventInfo event={selectedEvent} onTakeEvent={this.takeEvent} /> : <ListEvents events={events} width={this.eventModalWidth} onSelectEvent={this.onSelectEvent} />}
              </ContentContainer>
            </View>
            :
            <GenericAlert
              message={alertTitle}
              description={alertDescription}
              onCancel={this.hideAlert}
              cancelText={'OK'}
            />}
        </Overlay>
      </Modal>
    );
  }
};
