import React, { Component } from 'react';
import styled from 'styled-components/native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import _ from 'lodash'
import {
  View,
  FlatList,
} from 'react-native';

import { Video } from '../../commons/components/VideoPlayer';
import MoiBackground from '../../commons/components/Background/MoiBackground';
import Navbar from '../../commons/components/Navbar/Navbar';
import { Size } from '../../commons/styles';
import { object, getHeightAspectRatio } from '../../commons/utils';
import { BottomBar, Line } from '../../commons/components/SceneComponents';
import Item from '../../commons/components/Item/Item';
import { TextBody } from '../../commons/components/Typography';

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
import { PORTRAIT, WEB_URL_BASE } from '../../constants';
import { ContentBox } from '../../commons/components/ContentComponents';
import deviceUtils from '../../commons/utils/device-utils';
import resources from '../../commons/components/Item/resources';
import eventsUtils from '../Events/events-utils';
import ModalAlert from '../../commons/components/Alert/ModalAlert';
import { generateAlertData } from '../../commons/components/Alert/alertUtils';

const isTablet = deviceUtils.isTablet();

const StyledContentBox = styled(ContentBox)`
  margin-bottom: ${Size.spaceMedium};
  padding-left: 10;
  padding-right: 12;
`;

const REWARDS_TYPE = {
  video: 'video',
  theme: 'theme',
  runFunction: 'runFunction',
}

class Inventory extends Component {
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

  activeItem = item => {
    if (!item.is_available) {
      this.setState({
        isEventModalOpen: true,
        itemSelected: {
          item: generateAlertData(item.name, item.description, item.inactive_image)
        }
      });

      return
    }

    if(_.isEmpty(item.rewards)) {
      this.setState({
        isEventModalOpen: true,
        itemSelected: {
          item: generateAlertData(item.name, item.description, item.image)
        }
      });
    } else {
      if ((Object.keys(item.rewards || {}) || []).includes(REWARDS_TYPE.video)) {
        const VIDEO_URL = `${WEB_URL_BASE}/${item.rewards.video}`

        Actions.videoPlayer({
          sourceVideo: VIDEO_URL,
          closeOnFinish: true,
        });

        return;
      }else if((Object.keys(item.rewards || {}) || []).includes(REWARDS_TYPE.runFunction)) {
        if(item.rewards[REWARDS_TYPE.runFunction] === 'openModal') {
          this.setState({ isEventModalOpen: true,
            itemSelected: {
              item: generateAlertData(item.name, 'Responderás 21 preguntas y al final recibirás tus resultados y recompensa inmediatamente', item.image),
              buttonProps: this.generateButtonProps('OK', this.goFinalQuiz) }
          });
        }
      } else {
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

        this.setState({
          isEventModalOpen: true,
          itemSelected: {
            item: generateAlertData(item.name, item.description, item.active ? item.image : item.inactive_image),
            buttonProps: this.generateButtonProps(currentStatus.textButton, this.updateItem(item))
          }
        });
      }
    }
  }

  _keyExtractor = (item, index) => (item.id || "").toString();

  get itemWidth() {
    return isTablet ? 125 : 90;
  }

  _renderMainItem = ({ item }) => {
    return (
      <Item
        active={item.active}
        disabled={!item.is_available}
        image={item.is_available ? item.image : item.inactive_image}
        width={this.itemWidth}
        onPress={() => this.activeItem(item)}
      />
    )
  }

  _renderEventsItem = ({ item }) => {
    return (
      <Item
        active={item.completed}
        disabled={!item.completed}
        image={item.completed ? item.image : item.inactive_image}
        width={this.itemWidth}
        onPress={() => this.setState({ isEventModalOpen: true, itemSelected: {item} })}
      />
    )
  }

  _renderItem = ({ item }) => {
    if ((Object.keys(item || {}) || []).includes('completed')) {
      return this._renderEventsItem({ item });
    }

    return this._renderMainItem({ item });
  }

  async getEventItems() {
    const { getEventsAsync } = this.props;
    let events = await getEventsAsync();
    const decoratedEvents = eventsUtils.addCompletedKeyEvents(events.events)
    events.events = decoratedEvents
    const allEvents = this.mergeAllEvents(events);
    this.setState({ events: eventsUtils.normalizeEvents(allEvents) });
  }

  mergeAllEvents(events) {
    let allEvents = [];
    Object.values(events).forEach((event) => allEvents = [...allEvents, ...event])
    return allEvents;
  }

  renderItems() {
    const { achievements = [] } = this.props;
    const { events } = this.state;

    const sortedAchievements = object.sortObjectsByKey(achievements, 'number');

    if (this.state.loading) return <Preloader key={'preloader'} />;

    return (
      <View style={{ flex: 1 }} key={0}>
        <FlatList
          data={[...sortedAchievements, ...events]}
          ListEmptyComponent={
            <TextBody center>No tienes logros ganados aún</TextBody>
          }
          renderItem={this._renderItem}
          keyExtractor={this._keyExtractor}
          numColumns={this.columnsNumber}
          columnWrapperStyle={{ justifyContent: 'center' }}
        />
      </View>
    );
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

  render() {
    const { modalVisible, currentVineta, itemSelected, isEventModalOpen } = this.state;
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

        {isEventModalOpen && <ModalAlert
          width={width}
          item={itemSelected.item}
          okButtonProps={itemSelected.buttonProps}
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

const mapStateToProps = (state) => ({
  device: state.device,
  achievements: state.user.achievements,
  finalTestResult: state.user.finalTestResult,
  scene: state.routes.scene,
  showPassiveMessage: state.user.showPassiveMessage,
})

const mapDispatchToProps = {
  getAchievementsAsync: userActions.getAchievementsAsync,
  updateAchievementsAsync: userActions.updateAchievementsAsync,
  loadFinalTestAsync: userActions.loadFinalTestAsync,
  getEventsAsync: userActions.getEventsAsync,
  showPassiveMessageAsync: userActions.showPassiveMessageAsync,
}


export default connect(mapStateToProps, mapDispatchToProps)(Inventory)
