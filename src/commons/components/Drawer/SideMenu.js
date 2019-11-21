import React, { Component } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components/native';
import Options from './Options';
import TreeScreenShot from '../TreeScreenShot/TreeScreenShot';
import { Title } from '../Typography';
import { Size, Palette } from '../../styles';
import { DRAWER_OFFSET, PORTRAIT } from '../../../constants';
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
  border-right-color: ${Palette.colors.darkBlue};
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
  border-bottom-color: ${Palette.colors.darkBlue.alpha(0.1).css()};
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const TreContainer = styled(View)`
  align-self: center;
  width: 80%;
  margin-top: 20;
`;

const CloseIcon = styled(Ionicons)`
  color: ${Palette.colors.darkBlue};
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
  title: {
    color: Palette.colors.darkBlue
  }
});

class SideMenu extends Component {
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
        icon: 'award',
        onPress: (option) => {
          if(onPressOption) onPressOption(option);
        }
      },
      {
        id: 'settings',
        label: 'Configuración',
        icon: 'settings',
        onPress: (option) => {
          if(onPressOption) onPressOption(option);
        }
      },
      {
        id: 'leaderboard',
        label: 'Leaderboard',
        icon: 'list',
        onPress: (option) => {
          if(onPressOption) onPressOption(option);
        }
      },
      {
        id: 'searchFriends',
        label: 'Buscar Amigos',
        icon: 'users',
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
          <SideBarTitleContainer>
            <Title inverted bolder style={styles.title}>Menú</Title>
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
            showAvatar={false}
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
              />
            </TouchableOpacity>
          </TreContainer>
        </ScrollView>
      </SideMenuContainer>
    );
  }
}

const mapStateToProps = state => ({
  device: state.device,
  userTree: state.tree.userTree,
  user: state.user.userData,
  profile: state.user.profile,
  achievements: state.user.achievements,
})

export default connect(mapStateToProps)(SideMenu)
