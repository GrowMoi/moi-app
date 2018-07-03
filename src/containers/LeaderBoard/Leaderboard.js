import React, { PureComponent } from 'react';
import styled from 'styled-components/native';
import { connect } from 'react-redux';
import uuid from 'uuid/v4';
import { View, FlatList, StyleSheet, Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import MoiBackground from '../../commons/components/Background/MoiBackground';
import Navbar from '../../commons/components/Navbar/Navbar';
import { Size } from '../../commons/styles';
import LeaderRow from '../../commons/components/LeaderRow/LeaderRow';
import leaderboardActions from '../../actions/leaderboardActions';
import { normalize, object } from '../../commons/utils';
import { BottomBar } from '../../commons/components/SceneComponents';
import Preloader from '../../commons/components/Preloader/Preloader';
import LeaderFrame from '../../commons/components/LeaderFrame/LeaderFrame';

// Actions
import profilesActions from '../../actions/profileActions';
import treeActions from '../../actions/treeActions';

const FrameContainer = styled(View)`
  flex: 1;
  margin-top: ${Size.navbarHeight};
  align-items: center;
  justify-content: center;
  align-self: stretch;
`;

@connect(state => ({
  leaders: state.leaderboard.leaders,
  device: state.device,
}), {
  getLeaderboardAsync: leaderboardActions.getLeadersAsync,
  getPublicProfileAsync: profilesActions.loadProfileAsync,
  loadTreeAsync: treeActions.loadTreeAsync,
})
export default class LeaderBoard extends PureComponent {
  state = {
    isLoadingProfile: false,
  }

  async componentDidMount() {
    const { getLeaderboardAsync } = this.props;
    await getLeaderboardAsync();
  }

  fetchNextPage = async () => {
    const { leaders: { meta }, getLeaderboardAsync } = this.props;
  }

  onPressProfile = async (item) => {
    const { getPublicProfileAsync, loadTreeAsync } = this.props;

    const { username } = item;

    if(!username || username === undefined) return;
    if(username === 'unknow') {
      Alert.alert('Error', 'El perfil de este usuario es desconocido, intenta con otro por favor.')
      return;
    }

    this.setState({ isLoadingProfile: true });

    try {
      const profile = await getPublicProfileAsync(username);

      const treeIsPublic = true;
      const tree = await loadTreeAsync(username, treeIsPublic);

      this.setState({ isLoadingProfile: false });

      if(!object.isEmpty(tree) && !object.isEmpty(profile)) {
        Actions.publicProfile({
          profile: profile.data,
          level: tree.data.meta.depth,
        });
      }
    } catch (error) {
      this.setState({ isLoadingProfile: false });
      throw new Error(error);
    }

  }

  _keyExtractor = (item, index) => uuid();
  _renderItem = ({ item }) => {
    const { leaders: { meta } } = this.props;
    return (
      <LeaderRow
        playerName={normalize.normalizeAllCapLetter(item.username)}
        grade={`${item.contents_learnt} / ${meta.total_contents}`}
        seconds={`${new Date(item.time_elapsed).getSeconds()}s`}
        onPress={() => this.onPressProfile(item)}
      />
    )
  }
  render() {
    const { leaders: dataLeaders, device: { dimensions: { width, height } } } = this.props;

    const framePadding = 100;
    const styles = StyleSheet.create({
      contentContainer: {
        alignSelf: 'stretch',
        width: width - framePadding,
      }
    })

    return (
      <MoiBackground>
        <Navbar />
        <FrameContainer>
        <LeaderFrame width={(width - 35)}>
            {(dataLeaders.leaders || []).length > 0 && (
              <FlatList
                contentContainerStyle={styles.contentContainer}
                onEndReached={this.fetchNextPage}
                onEndReachedThreshold={0}
                data={dataLeaders.leaders}
                renderItem={this._renderItem}
                keyExtractor={this._keyExtractor}
              />
            )}
            {!(dataLeaders.leaders || []).length > 0 && (
              <Preloader notFullScreen/>
            )}
          </LeaderFrame>
          {this.state.isLoadingProfile && <Preloader />}
        </FrameContainer>
        <BottomBar />
      </MoiBackground>
    );
  }
}
