import React, { PureComponent } from 'react';
import styled from 'styled-components/native';
import { connect } from 'react-redux';
import uuid from 'uuid/v4';
import { View, FlatList, StyleSheet, Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Size, Palette } from '../../commons/styles';
import LeaderRow from '../../commons/components/LeaderRow/LeaderRow';
import { normalize, object } from '../../commons/utils';
import Preloader from '../../commons/components/Preloader/Preloader';
import { FontAwesome } from '@expo/vector-icons';

// Actions
import profilesActions from '../../actions/profileActions';
import treeActions from '../../actions/treeActions';
import { ContentBox } from '../../commons/components/ContentComponents';
import leaderboardActions from '../../actions/leaderboardActions';
import deviceUtils from '../../commons/utils/device-utils';

const isTablet = deviceUtils.isTablet();

const ContentContainer = styled(View)`
  width: ${isTablet ? '85%' : '96%'};
  height:${isTablet ? '90%' : '100%'};
  padding-right: 8;
  padding-top: 10;
`;

const StyledContentBox = styled(ContentBox)`
  align-items: center;
  justify-content: center;
`;

const ContentFooter = styled(View)`
  height: 70;
  justify-content: center;
  align-items: center;
`;

class LeaderBoardContent extends PureComponent {
  state = {
    isLoadingProfile: false,
    loading: true,
  }

  isSuperEventLeaderBoard;

  async componentDidMount() {
    const { getLeaderboardAsync, profile } = this.props;
    const leaderboardParams = {
      user_id: profile.id
    };
    await getLeaderboardAsync(leaderboardParams, 1);
    this.setState({loading: false});
  }

  fetchNextPage = async () => {
    const { loadMoreLeadersAsync, leaderboardParams } = this.props;
    await loadMoreLeadersAsync(leaderboardParams);
  }

  onPressProfile = async (item) => {
    const { getPublicProfileAsync, loadTreeAsync, closeModal } = this.props;

    const { username } = item;

    if (!username || username === undefined) return;
    if (username === 'unknow') {
      Alert.alert('Error', 'El perfil de este usuario es desconocido, intenta con otro por favor.')
      return;
    }

    this.showProfileLoader();

    try {
      const profile = await getPublicProfileAsync(username);

      const treeIsPublic = true;
      const tree = await loadTreeAsync(username, treeIsPublic);

      this.showProfileLoader(false);

      if (!object.isEmpty(tree) && !object.isEmpty(profile)) {
        if(closeModal) closeModal();
        Actions.publicProfile({
          profile: profile.data,
          level: tree.data.meta.depth,
        });
      }
    } catch (error) {
      this.showProfileLoader(false);
      throw new Error(error);
    }

  }

  showProfileLoader(show = true) {
    const { showLoading } = this.props;
     if(showLoading) {
       showLoading(show)
    } else {
      this.setState({ isLoadingProfile: show });
    }
  }

  _keyExtractor = (item, index) => index.toString();
  _renderItem = ({ item, index }) => {
    const { profile, leaders: { meta: { total_super_event_achievements } } } = this.props;
    const style = item.user_id === profile.id ? { backgroundColor: Palette.white.alpha(0.7).css() } : {};

    const secondsOrEventsCompletedsData = this.isSuperEventLeaderBoard ?
      `${item.super_event_achievements_count}/${total_super_event_achievements}`
      :
      `${new Date(item.time_elapsed).getSeconds()}s`

    return (
      <LeaderRow
        position={index + 1}
        style={style}
        playerName={normalize.normalizeAllCapLetter(item.username)}
        grade={item.contents_learnt}
        seconds={secondsOrEventsCompletedsData}
        onPress={() => this.onPressProfile(item)}
      />
    )
  }
  render() {
    const {
      leaders: {
        leaders: allLeaders,
        meta: { user_data: userLeader }
      },
      closeModal,
    } = this.props;
    const { isLoadingProfile, loading } = this.state;

    const styles = StyleSheet.create({
      contentContainer: {
        alignSelf: 'stretch',
        width: '100%',
      }
    })

    this.isSuperEventLeaderBoard = !!closeModal;

    if(loading) return <Preloader notFullScreen/>;

    return (
      <ContentContainer>
        {(allLeaders || []).length > 0 && (
          <FlatList
            style={{ height: '80%', top: -20 }}
            contentContainerStyle={styles.contentContainer}
            onEndReached={this.fetchNextPage}
            onEndReachedThreshold={1}
            data={allLeaders}
            renderItem={this._renderItem}
            keyExtractor={this._keyExtractor}
          />
        )}
        {isLoadingProfile && <Preloader />}
      </ContentContainer>
    );
  }
}

const mapStateToProps = (state) => ({
  leaders: state.leaderboard.leaders,
  profile: state.user.profile,
})

const mapDispatchToProps = {
  getLeaderboardAsync: leaderboardActions.getLeadersAsync,
  loadMoreLeadersAsync: leaderboardActions.loadMoreLeadersAsync,
  getPublicProfileAsync: profilesActions.loadProfileAsync,
  loadTreeAsync: treeActions.loadTreeAsync,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LeaderBoardContent)
