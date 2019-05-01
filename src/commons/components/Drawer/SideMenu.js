import React, { Component } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Image,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled, { css } from 'styled-components/native';
import Options from './Options';
import MoIcon from '../MoIcon/MoIcon';
import TreeScreenShot from '../TreeScreenShot/TreeScreenShot';
import { Title, Header } from '../Typography';
import { Size, Palette } from '../../styles';
import { DRAWER_OFFSET, PORTRAIT } from '../../../constants';
import { normalizeAllCapLetter } from '../../utils';

import regular_box from '../../../../assets/images/background/regular_box.png';
import yellow_box from '../../../../assets/images/background/amarillo_box.png';
import orange_box from '../../../../assets/images/background/naranja_box.png';
import fushia_box from '../../../../assets/images/background/fuccia_box.png';
import blue_box from '../../../../assets/images/background/azul_box.png';
import lila_box from '../../../../assets/images/background/lila_box.png';
import green_box from '../../../../assets/images/background/verde_box.png';
import treeBackgroundDrawer from '../../../../assets/images/sideMenu/background_tree_drawer.png';
import menuSideFrame from '../../../../assets/images/sideMenu/menu-side-frame.png';

const SideMenuContainer = styled(ImageBackground)`
  flex: 1;
  margin-top: ${-Size.spaceSmall};
  padding-top: ${Size.spaceMedium};
  background-color: ${Palette.menuBackground};
`;

const SideBarTitleContainer = styled(View)`
  flex: 1;
  align-items: center;
  padding-right: 20;
`;

const SideBarMenuHeader = styled(View)`
  padding-horizontal: ${Size.spaceMedium};
  padding-bottom: ${Size.spaceSmall};
  border-bottom-width: 1;
  border-bottom-color: ${Palette.white.alpha(0.1).css()};
  flex-direction: row;
`;

const TreContainer = styled(View)`
  align-self: center;
  bottom: 0;
`;

const UserNameContainer = styled(View)`
  padding-horizontal: ${Size.spaceMedium};
  padding-vertical: ${Size.spaceMedium};
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const UserName = styled(Header)`
  width: 130;
`;

const styles = StyleSheet.create({
  ScrollViewContainer: {
    flex: 1,
  },
});

@connect(store => ({
  device: store.device,
  userTree: store.tree.userTree,
  user: store.user.userData,
  profile: store.user.profile,
  achievements: store.user.achievements,
}))
export default class SideMenu extends Component {
  static propTypes = {
    device: PropTypes.any,
    userTree: PropTypes.any,
    user: PropTypes.object,
  }

   get currentAchievement() {
    const { achievements } = this.props;

    const [achievement] = (achievements || []).filter(item => item.active);
    return achievement;
  }

  render() {
    const { device, userTree, user, profile, data, onPressOption } = this.props;
    const { orientation } = device.dimensions;
    const portraitOrientation = orientation === PORTRAIT;

    const treeIsLoaded = 'tree' in userTree;

    const options = [
      {
        id: 'inventory',
        label: 'Inventario',
        onPress: () => {
          if(onPressOption) onPressOption();
          Actions.refresh({ key: 'inventory' })
        }
      },
      {
        id: 'settings',
        label: 'Configuración',
        onPress: () => {
          if(onPressOption) onPressOption();
          Actions.refresh({ key: 'settings' })
        }
      },
      {
        id: 'leaderboard',
        label: 'Leaderboard',
        onPress: () => {
          if(onPressOption) onPressOption();
          Actions.refresh({ key: 'leaderboard' })
        }
      },
      {
        id: 'friends',
        label: 'Buscar Amigos',
        onPress: () => {
          if(onPressOption) onPressOption();
          Actions.refresh({ key: 'searchFriends' })
        }
      },
    ];

    let currentBox = regular_box;
    const currentAchievement = (this.currentAchievement || {}).number;
    if(currentAchievement === 2) currentBox = yellow_box;
    else if(currentAchievement === 3) currentBox = fushia_box;
    else if(currentAchievement === 4) currentBox = blue_box;
    else if(currentAchievement === 5) currentBox = green_box;
    else if(currentAchievement === 8) currentBox = lila_box;

    return (
      <SideMenuContainer
        resizeMode='cover'
        source={currentBox}
      >
        <SideBarMenuHeader>
          <MoIcon name='treeIcon' size={28} />
          <SideBarTitleContainer>
            <Title inverted bolder>Menú</Title>
          </SideBarTitleContainer>
        </SideBarMenuHeader>

        <ScrollView
          contentContainerStyle={portraitOrientation && styles.ScrollViewContainer}
          showsVerticalScrollIndicator
        >
          <UserNameContainer>
            <UserName numberOfLines={1} small heavy inverted>{profile.name || profile.username}</UserName>
            <Header small heavy inverted>Nivel: {treeIsLoaded && userTree.meta.depth}</Header>
          </UserNameContainer>

          <Options options={options}/>

          <TreContainer>
            <TouchableOpacity onPress={() => {
              if(onPressOption) onPressOption();
              Actions.refresh({ key: 'tree', type: 'reset' });
            }}>
              <TreeScreenShot width={DRAWER_OFFSET - 2} height={230} treeBackground={treeBackgroundDrawer} profileImage={profile.tree_image} style={{margin: 10}} frame={menuSideFrame} />
            </TouchableOpacity>
          </TreContainer>
        </ScrollView>
      </SideMenuContainer>
    );
  }
}
