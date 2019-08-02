import React, { Component } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons'
import { Actions, ActionConst } from 'react-native-router-flux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled, { css } from 'styled-components/native';
import Options from './Options';
import MoIcon from '../MoIcon/MoIcon';
import TreeScreenShot from '../TreeScreenShot/TreeScreenShot';
import { Title, Header } from '../Typography';
import { Size, Palette } from '../../styles';
import { DRAWER_OFFSET, PORTRAIT } from '../../../constants';
import * as routeTypes from '../../../routeTypes'
import { normalizeAllCapLetter } from '../../utils';
import UserInfo from './UserInfo';

const SideMenuContainer = styled(ImageBackground)`
  flex: 1;
  margin-top: ${-Size.spaceSmall};
  padding-top: ${Size.spaceMedium + Size.mavbarTopSpace};
  background-color: ${Palette.menuBackground};
  border-right-color: ${Palette.dark.alpha(0.3)};
  border-right-width: 2;
  shadow-offset: 2.5px 0px;
  shadow-radius: 2.5;
  shadow-opacity: 0.7;
  shadow-color: ${Palette.black.alpha(0.4)};
`;

const SideBarTitleContainer = styled(View)`
  flex: 1;
  align-items: center;
`;

const SideBarMenuHeader = styled(View)`
  padding-left: ${Size.spaceMedium};
  padding-right: 10;
  padding-bottom: ${Size.spaceSmall};
  border-bottom-width: 1;
  border-bottom-color: ${Palette.white.alpha(0.1).css()};
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const TreContainer = styled(View)`
  align-self: center;
  bottom: 0;
  margin-top: 40;
`;

const CloseIcon = styled(Ionicons)`
  color: white;
`

const CloseButton = styled(TouchableOpacity)`
  width: 45;
  height: 45;
  align-items: center;
  justify-content: center;
`

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

  get options() {
    const { onPressOption } = this.props;

    const options = [
      {
        id: 'inventory',
        label: 'Inventario',
        onPress: (option) => {
          if(onPressOption) onPressOption(option);
        }
      },
      {
        id: 'settings',
        label: 'Configuración',
        onPress: (option) => {
          if(onPressOption) onPressOption(option);
        }
      },
      {
        id: 'leaderboard',
        label: 'Leaderboard',
        onPress: (option) => {
          if(onPressOption) onPressOption(option);
        }
      },
      {
        id: 'searchFriends',
        label: 'Buscar Amigos',
        onPress: (option) => {
          if(onPressOption) onPressOption(option);
        }
      },
    ];

    return options
  }

  render() {
    const { device, userTree, user, profile, data, onPressOption, width, onClose } = this.props;
    const { orientation } = device.dimensions;
    const portraitOrientation = orientation === PORTRAIT;

    const treeIsLoaded = 'tree' in userTree;

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

          <CloseButton onPress={() => { if(onClose) onClose() }}>
            <CloseIcon name='ios-close' size={45}/>
          </CloseButton>
        </SideBarMenuHeader>

        <ScrollView
          contentContainerStyle={portraitOrientation && styles.ScrollViewContainer}
          showsVerticalScrollIndicator
        >
          <UserInfo
            avatarImage={profile.image}
            name={profile.name || profile.username || ''}
            level={treeIsLoaded ? userTree.meta.depth : 0}
          />

          <Options options={this.options}/>

          <TreContainer>
            <TouchableOpacity onPress={() => {
              if(onPressOption) onPressOption({ id: 'tree', label: 'Arbol' });
            }}>
              <TreeScreenShot
                width={width}
                height={Size.heigthTreeContainer}
                treeBackground={'background_tree_drawer'}
                profileImage={profile.tree_image_app}
                frame={'menu_side_frame'}
              />
            </TouchableOpacity>
          </TreContainer>
        </ScrollView>
      </SideMenuContainer>
    );
  }
}
