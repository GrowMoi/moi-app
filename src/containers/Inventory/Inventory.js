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
  Text,
  Dimensions,
} from 'react-native';

import { Video } from '../../commons/components/VideoPlayer';
import MoiBackground from '../../commons/components/Background/MoiBackground';
import Navbar from '../../commons/components/Navbar/Navbar';
import { Size } from '../../commons/styles';
import { object, getHeightAspectRatio } from '../../commons/utils';
import { BottomBar, Line } from '../../commons/components/SceneComponents';
import Item from '../../commons/components/Item/Item';
import { TextBody } from '../../commons/components/Typography';

import userActions from '../../actions/userActions';
import profileActions from '../../actions/profileActions'
import Preloader from '../../commons/components/Preloader/Preloader';
import Certificate from '../Certificate/Certificate';
import PassiveMessageAlert from '../../commons/components/Alert/PassiveMessageAlert';
import VerticalTabs from '../../commons/components/Tabs/VerticalTabs';
import ListCertificates from '../Certificate/ListCertificates';
import { PORTRAIT } from '../../constants';
import { ContentBox } from '../../commons/components/ContentComponents';
import deviceUtils from '../../commons/utils/device-utils';
import resources from '../../commons/components/Item/resources';
import eventsUtils from '../Events/events-utils';
import ModalAlert from '../../commons/components/Alert/ModalAlert';
import { generateAlertData } from '../../commons/components/Alert/alertUtils';
import { normalize } from '../../commons/utils'

const isTablet = deviceUtils.isTablet();

const StyledContentBox = styled(ContentBox)`
  margin-bottom: ${Size.spaceMedium};
  margin-left: 25;
  margin-right: 10;
  width: 90%
  overflow: hidden;
`;

const width = 108;
const height = 107;
const Container = styled(TouchableOpacity)`
  justify-content: center;
  align-items: center;
  margin-horizontal: 5;
  margin-vertical: 5;
  overflow: hidden;
  width: ${props => props.width};
  height: ${props => getHeightAspectRatio(width, height, props.width)};
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

class Inventory extends Component {
  state = {
    itemSelected: {},
    loading: false,
    events: [],
  }

  get columnsNumber() {
    const { device: { dimensions: { orientation } } } = this.props;
    const defaultColumns = isTablet ? 3 : 2;
    const additionalColumns = orientation === PORTRAIT ? 0 : 1;
    return defaultColumns + additionalColumns;
  }

  updateItem = ({ id, name }) => async () => {
    const { updateAchievementsAsync, getUserProfileAsync, profile } = this.props;

    if (id) {
      this.showLoading();

      try {
        await updateAchievementsAsync(id);
        await getUserProfileAsync(profile.id);
        this.showLoading(false);
      } catch (error) {
        this.showLoading(false);
        this.showErrorMessage();
      }
    }
  }

  showErrorMessage() {
    this.showAlert('Ha ocurrido un error por favor intentelo de nuevo mas tarde', () => Actions.pop());
  }

  showLoading(isVisible = true) {
    this.setState({ loading: isVisible });
  }

  goFinalQuiz = async () => {
    const { loadFinalTestAsync } = this.props;
    this.showLoading();
    await loadFinalTestAsync();
    Actions.quiz({ quizTitle: 'Test Final' });
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
    const source = resources.getItem(item.number);
    if (item.disabled) {
      this.setState({ isEventModalOpen: true, itemSelected: {item: generateAlertData(item.name, item.description, source.disabled)} });
      return
    }

    if (item.number === 10) {
      this.setState({
        isEventModalOpen: true,
        itemSelected: {
          item: generateAlertData(item.name, 'Responderás 21 preguntas y al final recibirás tus resultados y recompensa inmediatamente', source.source),
        buttonProps: this.generateButtonProps('OK', this.goFinalQuiz) }
      });
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

    this.setState({ isEventModalOpen: true, itemSelected: { item: generateAlertData(item.name, item.description, item.active ? source.source : source.inactive), buttonProps: this.generateButtonProps(currentStatus.textButton, this.updateItem(item)) } });
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
        description: 'Han sido aprendidos 16 contenidos de la rama ¿Cómo haces para alcanzar tus sueños?',
        name: 'Contenidos aprendidos rama ¿Cómo haces para alcanzar tus sueños?',
        number: 2
      },
      // {
      //   disabled: true,
      //   description: 'Aprende 20 contenidos de color rojo para ganar este item',
      //   name: 'Contenidos color Rojo',
      //   number: 3
      // },
      {
        disabled: true,
        description: 'Han sido aprendidos 16 contenidos de la rama ¿Qué herramienta te ayuda para cumplir tus sueños?',
        name: 'Contenidos aprendidos rama ¿Qué herramienta te ayuda para cumplir tus sueños?',
        number: 4
      },
      {
        disabled: true,
        description: 'Han sido aprendidos 16 contenidos de la rama ¿Qué necesitas para alcanzar tus sueños?',
        name: 'Contenidos aprendidos rama ¿Qué necesitas para alcanzar tus sueños?',
        number: 5
      },
      {
        disabled: true,
        description: 'Todos los contenidos han sido aprendidos',
        name: 'Contenidos aprendidos en total',
        number: 6
      },
      {
        disabled: true,
        description: 'Al menos un contenido ha sido aprendido en cada neurona pública',
        name: 'Contenidos aprendidos en cada neurona pública',
        number: 7
      },
      {
        disabled: true,
        description: 'Han sido completados 4 test sin errores',
        name: 'Tests sin errores',
        number: 8
      },
      {
        disabled: true,
        description: 'Han sido desplegados 8 test sin errores',
        name: 'Tests desplegados',
        number: 9
      },
      {
        disabled: true,
        description: 'El usuario ha llegado al nivel maximo',
        name: 'Tests Final',
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
    return isTablet ? normalize.normalizePixelRatio(50) : 100;
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

  // _renderEventsItem = ({ item }) => {
  //   const width = this.itemWidth;
  //   const box = resources.getBox(!item.completed)
  //   return (
  //     <Container
  //       onPress={() => this.setState({ isEventModalOpen: true, itemSelected: {item} })}
  //       activeOpacity={0.8}
  //       width={width}
  //       inactive={!item.completed}
  //     >
  //       <ItemBackground
  //         width={width}
  //         source={{ uri: box }}>
  //         <EventImage
  //           source={{ uri: item.completed ? item.image : item.inactive_image }}
  //           width={item.completed ?  width + 10: width - 40}
  //         />
  //       </ItemBackground>
  //     </Container>
  //   );
  // }

  // _renderSection = ({ data }) => {

  //   return (
  //     <View style={{ flex: 1 }}>
  //       <FlatList
  //         data={data}
  //         ListEmptyComponent={
  //           <TextBody center>No tienes logros ganados aún</TextBody>
  //         }
  //         renderItem={this._renderItem}
  //         keyExtractor={this._keyExtractor}
  //         numColumns={this.columnsNumber}
  //         // columnWrapperStyle={{ justifyContent: 'center' }}
  //       />
  //     </View>
  //   );
  // };

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

    const sortedAchievements = object.sortObjectsByKey(achievements, 'number');
    const allAchievements = this.addDisabledAchievements(sortedAchievements);

    if (this.state.loading) return <Preloader notFullScreen key={0} />;

    return (
      <View style={{ flex: 1 }} key={0}>
        <FlatList
          data={allAchievements}
          ListEmptyComponent={
            <TextBody center>No tienes logros ganados aún</TextBody>
          }
          renderItem={this._renderMainItem}
          keyExtractor={this._keyExtractor}
          numColumns={this.columnsNumber}
          columnWrapperStyle={{ justifyContent: 'center' }}
        />
      </View>
    );
  }

  render() {
    const { itemSelected, isEventModalOpen } = this.state;
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

        {!!finalTestResult ? (<Certificate />) : null}
        <BottomBar />
        <PassiveMessageAlert
          isOpenPassiveMessage={showPassiveMessage && scene.name === 'inventory' && !finalTestResult && !isEventModalOpen}
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
  profile: state.user.profile,
})

const mapDispatchToProps = {
  getAchievementsAsync: userActions.getAchievementsAsync,
  updateAchievementsAsync: userActions.updateAchievementsAsync,
  loadFinalTestAsync: userActions.loadFinalTestAsync,
  showPassiveMessageAsync: userActions.showPassiveMessageAsync,
  getUserProfileAsync: userActions.getUserProfileAsync,
}


export default connect(mapStateToProps, mapDispatchToProps)(Inventory)
