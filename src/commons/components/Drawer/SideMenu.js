import React, { Component } from 'react';
import {
  View,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled, { css } from 'styled-components/native';
import Options from './Options';
import MoIcon from '../MoIcon/MoIcon';
import { Title, Header } from '../Typography';
import { Size, Palette } from '../../styles';
import { DRAWER_OFFSET, PORTRAIT } from '../../../constants';
import macetaMenu from '../../../../assets/images/macetaMenu/maceta_menu.png';
import { normalizeAllCapLetter } from '../../utils';

const SideMenuContainer = styled(View)`
  flex: 1;
  padding-top: ${Size.spaceSmall};
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


const Maceta = styled(Image)`
  ${props => props.width && css`
    width: ${props.width};
  `};
`;

const TreContainer = styled(View)`
  align-self: center;
  bottom: -20;
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
}))
export default class SideMenu extends Component {
  static propTypes = {
    device: PropTypes.any,
    userTree: PropTypes.any,
    user: PropTypes.object,
  }

  render() {
    const { device, userTree, user, profile, data } = this.props;
    const { orientation } = device.dimensions;
    const portraitOrientation = orientation === PORTRAIT;

    const treeIsLoaded = 'tree' in userTree;

    const options = [
      { label: 'Inventario' },
      { label: 'Configuración', onPress: () => Actions.refresh({ key: 'settings' }) },
      { label: 'Privacidad' },
      { label: 'Leader Board', onPress: () => Actions.refresh({ key: 'leaderboard' }) },
      { label: 'Buscar Amigos', onPress: () => Actions.refresh({ key: 'searchFriends' }) },
    ];

    return (
      <SideMenuContainer>
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
            <TouchableOpacity onPress={() => Actions.refresh({ key: 'tree' })}>
              <Maceta width={DRAWER_OFFSET - 2} source={macetaMenu} resizeMode='contain' />
            </TouchableOpacity>
          </TreContainer>
        </ScrollView>
      </SideMenuContainer>
    );
  }
}
