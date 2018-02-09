import React, { Component } from 'react';
import styled from 'styled-components/native';
import { connect } from 'react-redux';
import { FormattedTime } from 'react-intl';
import { View, FlatList, Image, Alert } from 'react-native';
import uuid from 'uuid/v4';

import MoiBackground from '../../commons/components/Background/MoiBackground';
import Navbar from '../../commons/components/Navbar/Navbar';
import { Palette, Size } from '../../commons/styles';
import LeaderRow from '../../commons/components/LeaderRow/LeaderRow';
import { normalize } from '../../commons/utils';
import { BottomBar } from '../../commons/components/SceneComponents';
import LeaderFrame from '../../commons/components/LeaderFrame/LeaderFrame';
import Item from '../../commons/components/Item/Item';
import WoodFrame from '../../commons/components/WoodFrame';
import { TextBody } from '../../commons/components/Typography';

import userActions from '../../actions/userActions';

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
  updateItem = async ({ id, name }) => {
    const { updateAchievementsAsync } = this.props;

    if(id) await updateAchievementsAsync(id);
  }

  activeItem = item => {
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
    const { device: { dimensions: { width, height } }, achievements } = this.props;
    const frameLeaderPadding = 40;
    const frameWoodPadding = 130;

    const leaderFramePadding = (width - frameLeaderPadding);
    const woodFramePadding = (width - frameWoodPadding);

    if(!(achievements || []).length) return <TextBody>No tienes logros ganados</TextBody>;
    return (
      <MoiBackground>
        <Navbar />
        <FrameContainer>
          <LeaderFrame width={leaderFramePadding}>
            <WoodFrame width={woodFramePadding}>
              <FlatList
                data={achievements}
                renderItem={this._renderItem}
                keyExtractor={this._keyExtractor}
                numColumns={2}
              />
            </WoodFrame>
          </LeaderFrame>
        </FrameContainer>
        <BottomBar />
      </MoiBackground>
    );
  }
}
