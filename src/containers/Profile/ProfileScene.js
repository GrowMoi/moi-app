import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components/native';
import { Actions } from 'react-native-router-flux';
import { View, ScrollView, StyleSheet, Dimensions, Image } from 'react-native';

// Components
import Navbar from '../../commons/components/Navbar/Navbar';
import Moibackground from '../../commons/components/Background/MoiBackground';
import FavoritesTab from './TabsContent/FavoritesTab';
import LastContentsLearnt from './TabsContent/LastContentsLearnt';
import { BottomBar } from '../../commons/components/SceneComponents';
import ProfileInfo from './ProfileInfo';

// Redux Actions
import userActions from './../../actions/userActions';

@connect(store => ({
  user: store.user.userData,
  tree: store.tree.userTree,
  profile: store.user.profile,
}), {
  signOutAsync: userActions.signOutAsync,
})
export default class ProfileScene extends Component {
  editProfile = () => {
    Actions.editProfile();
  }

  signOut = async () => {
    const { signOutAsync } = this.props;
    await signOutAsync();
  }

  render() {
    const { tree: { meta: { depth: level } }, profile } = this.props;

    const tabsData = [
      { label: 'Favoritos', content: <FavoritesTab /> },
      { label: 'Ultimos 4', content: <LastContentsLearnt /> },
    ];

    const profileInfo = {
      profile,
      level,
    };

    return (
      <Moibackground>
        <Navbar />
        <ProfileInfo
          data={profileInfo}
          tabsData={tabsData}
          onClickEdit={this.editProfile}
          onClickSignOut={this.signOut}
        />
        <BottomBar />
      </Moibackground>
    );
  }
}
