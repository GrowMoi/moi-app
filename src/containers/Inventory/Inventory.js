import React, { Component } from 'react';
import styled, { css } from 'styled-components/native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import {
  View,
  FlatList,
  SectionList,
  TouchableOpacity,
  Image,
  Alert,
  ImageBackground,
} from 'react-native';

import { Video } from '../../commons/components/VideoPlayer';
import MoiBackground from '../../commons/components/Background/MoiBackground';
import Navbar from '../../commons/components/Navbar/Navbar';
import { Size } from '../../commons/styles';
import { object, getHeightAspectRatio } from '../../commons/utils';
import { BottomBar, Line } from '../../commons/components/SceneComponents';
import Item from '../../commons/components/Item/Item';
import { TextBody } from '../../commons/components/Typography';
import AlertComponent from '../../commons/components/Alert/Alert';
import GenericAlert from '../../commons/components/Alert/GenericAlert';

// Viñetas
import vineta_1 from '../../../assets/videos/vineta_1.mp4';
import vineta_2 from '../../../assets/videos/vineta_2.mp4';
import vineta_3 from '../../../assets/videos/vineta_3.mp4';
import vineta_4 from '../../../assets/videos/vineta_4.mp4';

import userActions from '../../actions/userActions';
import Preloader from '../../commons/components/Preloader/Preloader';
import Certificate from '../Certificate/Certificate';
import PassiveMessageAlert from '../../commons/components/Alert/PassiveMessageAlert';
import VerticalTabs from '../../commons/components/Tabs/VerticalTabs';
import ListCertificates from '../Certificate/ListCertificates';
import { PORTRAIT } from '../../constants';
import { ContentBox } from '../../commons/components/ContentComponents';
import ModalEventDescription from '../Events/ModalEventDescription';
import deviceUtils from '../../commons/utils/device-utils';
import resources from '../../commons/components/Item/resources';
import eventsUtils from '../Events/events-utils';

const isTablet = deviceUtils.isTablet();

const StyledContentBox = styled(ContentBox)`
  margin-bottom: ${Size.spaceMedium};
  padding-left: 10;
  padding-right: 12;
`;

const width = 108;
const height = 107;
const Container = styled(TouchableOpacity)`
  justify-content: center;
  align-items: center;
  margin-horizontal: 5;
  margin-vertical: 5;
  width: ${props => props.width};
  height: ${props => getHeightAspectRatio(width, height, props.width)};
  ${props => {
    if (props.inactive) {
      return css`
        border: solid 0px #40582D;
        border-radius: 13px;
      `}
  }
  }
  overflow: hidden;
`;

const EventImage = styled(Image)`
  width: ${ props => props.width};
  height: ${ props => getHeightAspectRatio(width, height, props.width)};
`;

const ItemBackground = styled(ImageBackground)`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

@connect(state => ({
  device: state.device,
  achievements: state.user.achievements,
  finalTestResult: state.user.finalTestResult,
  scene: state.routes.scene,
  showPassiveMessage: state.user.showPassiveMessage,
}), {
    getAchievementsAsync: userActions.getAchievementsAsync,
    updateAchievementsAsync: userActions.updateAchievementsAsync,
    loadFinalTestAsync: userActions.loadFinalTestAsync,
    getEventsWeekAsync: userActions.getEventsWeekAsync,
    getEventsAsync: userActions.getEventsAsync,
    showPassiveMessageAsync: userActions.showPassiveMessageAsync,
  })
export default class Inventory extends Component {
  state = {
    modalVisible: false,
    currentVineta: null,
    itemSelected: {},
    loading: false,
    events: [],
  }

  columnsNumber;
  allEvents;

  async componentDidMount() {
    this.generateNumberOfColumns()
    this.showLoading();
    await this.getEventItems();
    this.showLoading(false);
  }

  generateNumberOfColumns() {
    const { device: { dimensions: { orientation } } } = this.props;
    const defaultColumns = isTablet ? 3 : 2;
    const additionalColumns = orientation === PORTRAIT ? 0 : 1;
    this.columnsNumber = defaultColumns + additionalColumns;
  }

  updateItem = ({ id, name }) => async () => {
    const { updateAchievementsAsync } = this.props;
    this.showLoading();

    if (id) {
      try {
        await updateAchievementsAsync(id);
        this.showLoading(false);
      } catch (error) {
        this.showErrorMessage();
      }
    }
  }

  showErrorMessage() {
    this.showLoading(false);
    this.showAlert('Ha ocurrido un error por favor intentelo de nuevo mas tarde', () => Actions.pop());
  }

  showLoading(isVisible = true) {
    this.setState({ loading: isVisible });
  }

  showVideo = (show = true, vineta = vineta_1) => {
    this.setState({ modalVisible: show, currentVineta: vineta });
  }

  goFinalQuiz = async () => {
    const { loadFinalTestAsync } = this.props;
    this.showLoading();
    await loadFinalTestAsync();
    Actions.quiz();
    this.showLoading(false);
  }

  generateButtonProps = (title, opnPressButton) => {
    return {
      title,
      onPress: () => {
        this.setState({ isEventModalOpen: false })
        opnPressButton();
      }
    }
  }

  generateFakeEvent = (title, description, image) => {
    return {
      title,
      description,
      image
    }
  }

  activeItem = item => {
    const source = resources.getItem(item.number);
    if (item.disabled) {
      this.setState({ isEventModalOpen: true, eventSelected: this.generateFakeEvent(item.name, item.description, source.disabled) });
      return
    }

    if (item.number === 1) {
      this.showVideo();
      return;
    }
    else if (item.number === 6) {
      this.showVideo(true, vineta_4);
      return;
    }
    else if (item.number === 7) {
      this.showVideo(true, vineta_3);
      return;
    }
    else if (item.number === 9) {
      this.showVideo(true, vineta_2);
      return;
    } else if (item.number === 10) {
      this.setState({ isEventModalOpen: true, eventSelected: { ...this.generateFakeEvent(item.name, 'Responderás 21 preguntas y al final recibirás tus resultados y recompensa inmediatamente', source.source), buttonProps: this.generateButtonProps('OK', this.goFinalQuiz) } });
      return;
    }

    let currentStatus = {};

    if (item.active) {
      currentStatus = {
        status: 'Habilitado',
        textButton: 'Desactivar',
      }
    } else {
      currentStatus = {
        status: 'Desabilitado',
        textButton: 'Activar',
      }
    }

    this.setState({ isEventModalOpen: true, eventSelected: { ...this.generateFakeEvent(item.name,`${item.description} (Item ${currentStatus.status})`, item.active ? source.source : source.inactive), buttonProps: this.generateButtonProps(currentStatus.textButton, this.updateItem(item)) } });
  }

  addDisabledAchievements = (currentAchievements = []) => {
    const disabledAchievements = [
      {
        disabled: true,
        description: 'Aprende tus primeros 4 contenidos para ganar este item',
        name: 'Contenidos Aprendidos',
        number: 1
      },
      {
        disabled: true,
        description: 'Aprende 20 contenidos de color amarillo para ganar este item',
        name: 'Contenidos color Amarillo',
        number: 2
      },
      {
        disabled: true,
        description: 'Aprende 20 contenidos de color rojo para ganar este item',
        name: 'Contenidos color Rojo',
        number: 3
      },
      {
        disabled: true,
        description: 'Aprende 20 contenidos de color azul',
        name: 'Contenidos color Azul',
        number: 4
      },
      {
        disabled: true,
        description: 'Aprende 20 contenidos de color verde para ganar este item',
        name: 'Contenidos color verde',
        number: 5
      },
      {
        disabled: true,
        description: 'Despliega 50 pruebas para ganar este item',
        name: 'Despliega 50 pruebas',
        number: 6
      },
      {
        disabled: true,
        description: 'Aprende un contenido en cada fruto para ganar este item',
        name: 'Contenidos de cada fruto',
        number: 7
      },
      {
        disabled: true,
        description: 'Aprende todos los contenidos para ganar este item',
        name: 'Aprende todos los contenidos',
        number: 8
      },
      {
        disabled: true,
        description: 'Completa 4 pruebas sin errores (16 preguntas sin errores) para ganar este item',
        name: 'Completa 4 pruebas',
        number: 9
      },
      {
        disabled: true,
        description: 'Alcanzar el nivel 9 para ganar este item',
        name: 'Final del juego',
        number: 10
      }
    ];

    return disabledAchievements.map(disabledAchievement => {
      const itemExists = currentAchievements.find(currentAchievement => {
        return currentAchievement.number === disabledAchievement.number
      });
      return itemExists ? itemExists : disabledAchievement;
    })
  }

  _keyExtractor = (item, index) => index.toString();

  get itemWidth() {
    return isTablet ? 125 : 90;
  }

  _renderMainItem = ({ item }) => {
    return (
      <Item
        type={item.number}
        active={item.active}
        disabled={item.disabled}
        width={this.itemWidth}
        onPress={() => this.activeItem(item)}
      />
    )
  }

  _renderEventsItem = ({ item }) => {
    const width = this.itemWidth;
    const box = resources.getBox(!item.completed)
    return (
      <Container
        onPress={() => this.setState({ isEventModalOpen: true, eventSelected: item })}
        activeOpacity={0.8}
        width={width}
        inactive={!item.completed}
      >
        <ItemBackground
          width={width}
          source={{ uri: box }}>
          <EventImage
            source={{ uri: item.completed ? item.image : item.inactive_image }}
            width={item.completed ? width - 30 : width - 40}
          />
        </ItemBackground>
      </Container>
    );
  }

  _renderItem = ({ item }) => {
    if ((Object.keys(item || {}) || []).includes('completed')) {
      return this._renderEventsItem({ item });
    }

    return this._renderMainItem({ item });
  }

  _renderSection = ({ section, index }) => {
    const data = section.data[0];

    return (
      <View style={{ flex: 1 }}>
        {/* {data.key === 'events' && <Line style={{marginTop:10, marginBottom:10}}  size={5}/> } */}
        <FlatList
          data={data.list}
          ListEmptyComponent={
            <TextBody center>No tienes logros ganados aún</TextBody>
          }
          renderItem={this._renderItem}
          keyExtractor={this._keyExtractor}
          numColumns={this.columnsNumber}
          columnWrapperStyle={{ justifyContent: 'center' }}
          key={index}
        />
      </View>
    );
  };

  async getEventItems() {
    const { getEventsAsync, getEventsWeekAsync } = this.props;
    let events = await getEventsAsync();
    const eventsWeek = await getEventsWeekAsync();
    const eventsWeekArray = this.mergeAllEvents(eventsWeek);
    const decoratedEvents = eventsUtils.addCompletedKeyEvents(events.events, eventsWeekArray)
    events.events = decoratedEvents
    const allEvents = this.mergeAllEvents(events);
    this.setState({ events: eventsUtils.normalizeEvents(allEvents) });
  }

  mergeAllEvents(events) {
    let allEvents = [];
    Object.values(events).forEach((event) => allEvents = [...allEvents, ...event])
    return allEvents;
  }

  renderTabs() {
    const ContentCertificate = <ListCertificates key={1} />;

    const tabsData = [
      { label: 'Items', content: this.renderItems() },
      { label: 'Certificados', content: ContentCertificate },
    ];

    return (
      <VerticalTabs data={tabsData} horizontalTabs />
    )
  }

  renderItems() {
    const { achievements = [] } = this.props;
    const { events } = this.state;

    const sortedAchievements = object.sortObjectsByKey(achievements, 'number');
    const allAchievements = this.addDisabledAchievements(sortedAchievements);

    if (this.state.loading) return <Preloader key={0} />;

    return (
      <SectionList
        renderItem={this._renderSection}
        sections={[
          { title: '', data: [{ key: 'items', list: [...allAchievements, ...events] }] },
          // {title: '', data: [{key: 'events', list: allEvents}]},
        ]}
        keyExtractor={(item, index) => item.name + index}
        key={0}
      />
    );
  }

  render() {
    const { modalVisible, currentVineta, itemSelected, isEventModalOpen, eventSelected } = this.state;
    const { device: { dimensions: { width, height } }, finalTestResult, scene, showPassiveMessage, showPassiveMessageAsync } = this.props;

    const videoDimensions = {
      width: 1280,
      height: 720
    };

    return (
      <MoiBackground>
        <Navbar />
        <StyledContentBox image={'leaderboard_frame'}>
          {this.renderTabs()}
        </StyledContentBox>

        {isEventModalOpen && <ModalEventDescription
          width={width}
          item={eventSelected}
          onClose={() => { this.setState({ isEventModalOpen: false }) }}
        />}

        {modalVisible && <Video
          videoDimensions={videoDimensions}
          source={currentVineta}
          dismiss={() => this.showVideo(false)}
          visible={modalVisible}
          width={width}
        />}

        {finalTestResult && <Certificate />}
        <BottomBar />
        <PassiveMessageAlert
          isOpenPassiveMessage={showPassiveMessage && scene.name === 'inventory' && !modalVisible && !isEventModalOpen}
          touchableProps={{
            onPress: () => {
              showPassiveMessageAsync(false);
            }
          }}
          message='"Selecciona uno de los objetos que ganaste para activarlo. Cada uno tiene un efecto diferente'
        />
      </MoiBackground>
    );
  }
}
