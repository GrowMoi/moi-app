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

const SideMenuContainer = styled(ImageBackground)`
  flex: 1;
  margin-top: ${-Size.spaceSmall};
  padding-top: ${Size.spaceMedium + Size.mavbarTopSpace};
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

    let currentBox = 'regular_box';
    const currentAchievement = (this.currentAchievement || {}).number;
    if(currentAchievement === 2) currentBox = 'amarillo_box';
    else if(currentAchievement === 3) currentBox = 'fuccia_box';
    else if(currentAchievement === 4) currentBox = 'azul_box';
    else if(currentAchievement === 5) currentBox = 'verde_box';
    else if(currentAchievement === 8) currentBox = 'lila_box';

    return (
      <SideMenuContainer
        resizeMode='cover'
        source={{uri: currentBox}}
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
              <TreeScreenShot width={DRAWER_OFFSET - 2} height={230} treeBackground={'background_tree_drawer'} profileImage={profile.tree_image} style={{margin: 10}} frame={'menu_side_frame'} />
            </TouchableOpacity>
          </TreContainer>
        </ScrollView>
      </SideMenuContainer>
    );
  }
}
