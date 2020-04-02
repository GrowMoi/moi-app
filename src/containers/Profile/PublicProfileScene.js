import React, { Component } from 'react';
import styled from 'styled-components/native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import {
  View,
  ScrollView,
  StyleSheet,
  Dimensions,
  Image
} from 'react-native';

// Components
import Navbar from '../../commons/components/Navbar/Navbar';
import Moibackground from '../../commons/components/Background/MoiBackground';
import { BottomBar } from '../../commons/components/SceneComponents';
import ProfileInfo from './ProfileInfo';
import ContentTab from './TabsContent/ContentTab';

// Redux Actions
import neuronActions from './../../actions/neuronActions';
import UsersChatModal from '../../commons/components/UsersChatModal/UsersChatModal';

export default class PublicProfileScene extends Component {
  onClickItem = async(item) => {
    const { neuron_id, id: content_id } = item;
    if(neuron_id === undefined && item_id === undefined) return;

    Actions.singleContent({
      content_id,
      neuron_id,
      title: 'Contenido público',
    });
  }

  render() {
    const { profile, level } = this.props;

    let last_contents_learnt = [];
    if(profile.last_contents_learnt.length) {
      last_contents_learnt = profile.last_contents_learnt;
    }

    const ContentFavorites = (
      <ContentTab
        onClickItem={this.onClickItem}
        data={last_contents_learnt}
      />
    );

    const tabsData = [
      { label: 'Últimos 4', content: ContentFavorites },
    ];

    const profileInfo = { profile, level };

    return (
      <Moibackground>
        <Navbar />
        <ProfileInfo
          isShared
          data={profileInfo}
          tabsData={tabsData}
        />
        <UsersChatModal />
        <BottomBar />
      </Moibackground>
    );
  }
}
