import React, { Component } from 'react';
import styled from 'styled-components/native';
import { connect } from 'react-redux';
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

// Viñetas
import vineta_1 from '../../../assets/videos/vineta_1.mp4';
import vineta_2 from '../../../assets/videos/vineta_2.mp4';
import vineta_3 from '../../../assets/videos/vineta_3.mp4';
import vineta_4 from '../../../assets/videos/vineta_4.mp4';

import userActions from '../../actions/userActions';
import Preloader from '../../commons/components/Preloader/Preloader';

const FrameContainer = styled(View)`
  margin-top: ${Size.navbarHeight};
  align-items: center;
`;

@connect(state => ({
  leaders: state.leaderboard.leaders,
  device: state.device,
  achievements: state.user.achievements,
}), {
  getAchievementsAsync: userActions.getAchievementsAsync,
  updateAchievementsAsync: userActions.updateAchievementsAsync,
})
export default class Inventory extends Component {
  state = {
    modalVisible: false,
    currentVineta: null,
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

  activeItem = item => {
    if(item.number === 1) {
      this.showVideo();
      return;
    }
    else if(item.number === 6) {
      this.showVideo(true, vineta_2);
      return;
    }
    else if(item.number === 7) {
      this.showVideo(true, vineta_3);
      return;
    }
    else if(item.number === 8) {
      this.showVideo(true, vineta_4);
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

  _keyExtractor = (item, index) => uuid();
  _renderItem = ({ item }) => {
    return (
      <Item
        type={item.number}
        active={item.active}
        onPress={() => this.activeItem(item)}
      />
    )
  }

  render() {
    const { modalVisible, currentVineta, loading } = this.state;
    const { device: { dimensions: { width, height } }, achievements = [] } = this.props;
    const frameLeaderPadding = 40;
    const frameWoodPadding = 130;

    const leaderFramePadding = (width - frameLeaderPadding);
    const woodFramePadding = (width - frameWoodPadding);
    const videoDimensions = {
        width: 1280,
        height: 720
    };

    const sortedAchievements = object.sortObjectsByKey(achievements, 'number');

    return (
      <MoiBackground>
        <Navbar />
        <FrameContainer>
          {loading && <Preloader/>}
          <LeaderFrame width={leaderFramePadding}>
            <WoodFrame width={woodFramePadding}>
              <FlatList
                data={sortedAchievements}
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
        <BottomBar />
      </MoiBackground>
    );
  }
}
