import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components/native';
import { Actions } from 'react-native-router-flux';
import { View, ScrollView, StyleSheet, Dimensions, Image, Keyboard } from 'react-native';

// Components
import Navbar from '../../commons/components/Navbar/Navbar';
import Moibackground from '../../commons/components/Background/MoiBackground';
import FavoritesTab from './TabsContent/FavoritesTab';
import LastContentsLearnt from './TabsContent/LastContentsLearnt';
import { BottomBar } from '../../commons/components/SceneComponents';
import ProfileInfo from './ProfileInfo';
import PassiveMessageAlert from '../../commons/components/Alert/PassiveMessageAlert'

// Redux Actions
import userActions from './../../actions/userActions';

@connect(store => ({
  user: store.user.userData,
  tree: store.tree.userTree,
  profile: store.user.profile,
  scene: store.routes.scene,
  showPassiveMessage: store.user.showPassiveMessage,
}), {
  signOutAsync: userActions.signOutAsync,
  showPassiveMessageAsync: userActions.showPassiveMessageAsync,
})
export default class ProfileScene extends Component {
  scrollRef = null;

  editProfile = () => {
    Actions.editProfile();
  }

  signOut = async () => {
    const { signOutAsync } = this.props;
    await signOutAsync();
  }

  get tabs() {
    return [
      { label: 'Favoritos', content: <FavoritesTab enableScroll={this.enableMainScroll(true)} disableScroll={this.enableMainScroll(false)}/> },
      { label: 'Ultimos 4', content: <LastContentsLearnt /> },
    ];
  }

  enableMainScroll = (scrollEnabled) => () => {
    this.scrollRef.setNativeProps({ scrollEnabled: scrollEnabled });
  }

  render() {
    const { tree: { meta: { depth: level } }, profile, scene, showPassiveMessage, showPassiveMessageAsync } = this.props;

    const profileInfo = {
      profile,
      level,
    };

    return (
      <Moibackground>
        <Navbar />
        <ProfileInfo
          data={profileInfo}
          tabsData={this.tabs}
          onClickEdit={this.editProfile}
          onClickSignOut={this.signOut}
          onProfileInfoReady={(scrollRef) => {this.scrollRef = scrollRef}}
        />
        <BottomBar />

        <PassiveMessageAlert
          isOpenPassiveMessage={showPassiveMessage && scene.name === 'profile'}
          touchableProps={{
            onPress: () => {
                showPassiveMessageAsync(false);
            }
          }}
          message='Este es tu perfil personal. Edita tu información, revisa tus logros y la tabla de posiciones y busca a tus amigos
          haciendo clic en el botón correspondiente'
        />
      </Moibackground>
    );
  }
}
