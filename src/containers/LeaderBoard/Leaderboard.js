import React, { PureComponent } from 'react';
import styled from 'styled-components/native';
import { connect } from 'react-redux';
import uuid from 'uuid/v4';
import { View, FlatList, StyleSheet, Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { isTablet } from 'react-native-device-detection';
import MoiBackground from '../../commons/components/Background/MoiBackground';
import Navbar from '../../commons/components/Navbar/Navbar';
import { Size } from '../../commons/styles';
import LeaderRow from '../../commons/components/LeaderRow/LeaderRow';
import leaderboardActions from '../../actions/leaderboardActions';
import { normalize, object } from '../../commons/utils';
import { BottomBar } from '../../commons/components/SceneComponents';
import Preloader from '../../commons/components/Preloader/Preloader';
import leaderFrame from '../../../assets/images/frames/leaderboard_frame.png';

// Actions
import profilesActions from '../../actions/profileActions';
import treeActions from '../../actions/treeActions';
import { ContentBox } from '../../commons/components/ContentComponents';

const ContentContainer = styled(View)`
  width: ${isTablet ? '85%' : '96%'};
  height:${isTablet ? '90%' : '98%'};
  padding-right: 8;
  padding-top: 10;
`;

const StyledContentBox = styled(ContentBox)`
  margin-bottom: ${Size.spaceMedium};
  align-items: center;
  justify-content: center;
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

    if (!username || username === undefined) return;
    if (username === 'unknow') {
      Alert.alert('Error', 'El perfil de este usuario es desconocido, intenta con otro por favor.')
      return;
    }

    this.setState({ isLoadingProfile: true });

    try {
      const profile = await getPublicProfileAsync(username);

      const treeIsPublic = true;
      const tree = await loadTreeAsync(username, treeIsPublic);

      this.setState({ isLoadingProfile: false });

      if (!object.isEmpty(tree) && !object.isEmpty(profile)) {
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
        grade={item.contents_learnt}
        seconds={`${new Date(item.time_elapsed).getSeconds()}s`}
        onPress={() => this.onPressProfile(item)}
      />
    )
  }
  render() {
    const { leaders: dataLeaders } = this.props;

    const styles = StyleSheet.create({
      contentContainer: {
        alignSelf: 'stretch',
        width: '100%',
      }
    })

    return (
      <MoiBackground>
        <Navbar />
        <StyledContentBox image={leaderFrame}>
          <ContentContainer>
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
              <Preloader notFullScreen />
            )}
          </ContentContainer>
        </StyledContentBox>
        {this.state.isLoadingProfile && <Preloader />}
        <BottomBar />
      </MoiBackground>
    );
  }
}
