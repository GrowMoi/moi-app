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
import UserInactivity from 'react-native-user-inactivity'
import PassiveMessageAlert from '../../commons/components/Alert/PassiveMessageAlert'

// Redux Actions
import userActions from './../../actions/userActions';
import { TIME_FOR_INACTIVITY } from '../../constants';

@connect(store => ({
  user: store.user.userData,
  tree: store.tree.userTree,
  profile: store.user.profile,
  scene: store.routes.scene,
}), {
  signOutAsync: userActions.signOutAsync,
})
export default class ProfileScene extends Component {
  state = {
    isOpenPassiveMessage: false,
  }

  editProfile = () => {
    Actions.editProfile();
  }

  signOut = async () => {
    const { signOutAsync } = this.props;
    await signOutAsync();
  }

  get tabs() {
    return [
      { label: 'Favoritos', content: <FavoritesTab /> },
      { label: 'Ultimos 4', content: <LastContentsLearnt /> },
    ];
  }

  render() {
    const { tree: { meta: { depth: level } }, profile, scene } = this.props;
    const { isOpenPassiveMessage } = this.state

    const profileInfo = {
      profile,
      level,
    };

    return (
      <UserInactivity
        timeForInactivity={TIME_FOR_INACTIVITY}
        onAction={(isActive) => {
          if(!isActive && scene.name === 'profile') {
            Keyboard.dismiss()
            this.setState({ isOpenPassiveMessage: !isActive })
          }
        }}
      >
        <Moibackground>
          <Navbar />
          <ProfileInfo
            data={profileInfo}
            tabsData={this.tabs}
            onClickEdit={this.editProfile}
            onClickSignOut={this.signOut}
          />
          <BottomBar />

          <PassiveMessageAlert
            isOpenPassiveMessage={isOpenPassiveMessage}
            touchableProps={{
              onPress: () => {
                this.setState(prevState => ({ isOpenPassiveMessage: !prevState.isOpenPassiveMessage }))
              }
            }}
            message='Este es tu perfil personal. Edita tu información, revisa tus logros y la tabla de posiciones y busca a tus amigos
            haciendo clic en el botón correspondiente'
          />
        </Moibackground>
      </UserInactivity>
    );
  }
}
