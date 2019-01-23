import React, { Component } from 'react';
import styled from 'styled-components/native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { FormattedTime } from 'react-intl';
import {
  View,
  FlatList,
  Image,
  Alert,
  Modal
} from 'react-native';
import uuid from 'uuid/v4';

import { Video } from '../../commons/components/VideoPlayer';
import MoiBackground from '../../commons/components/Background/MoiBackground';
import Navbar from '../../commons/components/Navbar/Navbar';
import { Palette, Size } from '../../commons/styles';
import LeaderRow from '../../commons/components/LeaderRow/LeaderRow';
import { object } from '../../commons/utils';
import { BottomBar } from '../../commons/components/SceneComponents';
import LeaderFrame from '../../commons/components/LeaderFrame/LeaderFrame';
import Item from '../../commons/components/Item/Item';
import WoodFrame from '../../commons/components/WoodFrame';
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

const FrameContainer = styled(View)`
  margin-top: ${Size.navbarHeight};
  align-items: center;
`;

@connect(state => ({
  device: state.device,
  achievements: state.user.achievements,
  finalTestResult: state.user.finalTestResult,
}), {
  getAchievementsAsync: userActions.getAchievementsAsync,
  updateAchievementsAsync: userActions.updateAchievementsAsync,
  loadFinalTestAsync: userActions.loadFinalTestAsync,
})
export default class Inventory extends Component {
  state = {
    modalVisible: false,
    currentVineta: null,
    isAlertOpen: false,
    itemSelected: {},
    loading: false
  }

  updateItem = async ({ id, name }) => {
    const { updateAchievementsAsync } = this.props;
    this.showLoading();

    if(id) {
      try {
        await updateAchievementsAsync(id);
        this.showLoading(false);
      } catch(error) {
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

  closeAlert = () => {
    this.setState({ isAlertOpen: false });
  }

  activeItem = item => {
    if (item.disabled) {
      this.setState({ isAlertOpen: true, itemSelected: item });
      return
    }

    if(item.number === 1) {
      this.showVideo();
      return;
    }
    else if(item.number === 6) {
      this.showVideo(true, vineta_4);
      return;
    }
    else if(item.number === 7) {
      this.showVideo(true, vineta_3);
      return;
    }
    else if(item.number === 9) {
      this.showVideo(true, vineta_2);
      return;
    } else if(item.number === 10) {
      Alert.alert(
        `${item.name} `,
        'Responderás 21 preguntas y al final recibirás tus resultados y recompensa inmediatamente',
        [
          {text: `OK`, onPress: () => this.goFinalQuiz() },
          {text: 'Cancelar', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        ],
      )
      return;
    }

    let currentStatus = {};

    if(item.active) {
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

    Alert.alert(
      `${item.name} `,
      `${item.description} (Item ${currentStatus.status})`,
      [
        {text: `${currentStatus.textButton}`, onPress: () => this.updateItem(item) },
        {text: 'Cancelar', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
      ],
    )
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

  _keyExtractor = (item, index) => uuid();
  _renderItem = ({ item }) => {
    return (
      <Item
        type={item.number}
        active={item.active}
        disabled={item.disabled}
        onPress={() => this.activeItem(item)}
      />
    )
  }

  render() {
    const { modalVisible, currentVineta, loading, isAlertOpen, itemSelected } = this.state;
    const { device: { dimensions: { width, height } }, achievements = [], finalTestResult } = this.props;
    const frameLeaderPadding = 40;
    const frameWoodPadding = 130;

    const leaderFramePadding = (width - frameLeaderPadding);
    const woodFramePadding = (width - frameWoodPadding);
    const videoDimensions = {
        width: 1280,
        height: 720
    };

    const sortedAchievements = object.sortObjectsByKey(achievements, 'number');
    const allAchievements = this.addDisabledAchievements(sortedAchievements);

    return (
      <MoiBackground>
        <Navbar />
        <FrameContainer>
          {loading && <Preloader/>}
          <LeaderFrame width={leaderFramePadding}>
            <WoodFrame width={woodFramePadding}>
              <FlatList
                data={allAchievements}
                ListEmptyComponent={
                  <TextBody center>No tienes logros ganados aún</TextBody>
                }
                renderItem={this._renderItem}
                keyExtractor={this._keyExtractor}
                numColumns={2}
                columnWrapperStyle={{ justifyContent: 'center' }}
              />
            </WoodFrame>
          </LeaderFrame>
        </FrameContainer>

        <Video
          videoDimensions={videoDimensions}
          source={currentVineta}
          dismiss={() => this.showVideo(false)}
          visible={modalVisible}
          width={width}
        />

        <AlertComponent open={isAlertOpen}>
          <GenericAlert
            message={itemSelected.name}
            description={itemSelected.description}
            onCancel={this.closeAlert}
            cancelText='Ok'
          />
        </AlertComponent>

        {finalTestResult && <Certificate/>}
        <BottomBar />
      </MoiBackground>
    );
  }
}
