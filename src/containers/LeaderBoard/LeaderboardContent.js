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

// Actions
import profilesActions from '../../actions/profileActions';
import treeActions from '../../actions/treeActions';
import { ContentBox } from '../../commons/components/ContentComponents';
import leaderboardActions from '../../actions/leaderboardActions';
import deviceUtils from '../../commons/utils/device-utils';

const isTablet = deviceUtils.isTablet();

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
  profile: state.user.profile,
}), {
    getLeaderboardAsync: leaderboardActions.getLeadersAsync,
    getPublicProfileAsync: profilesActions.loadProfileAsync,
    loadTreeAsync: treeActions.loadTreeAsync,
  })
export default class LeaderBoardContent extends PureComponent {
  state = {
    isLoadingProfile: false,
  }

  fetchNextPage = async () => {
    const { leaders: { meta }, getLeaderboardAsync } = this.props;
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

  _keyExtractor = (item, index) => uuid();
  _renderItem = ({ item }) => {
    const { leaders: { meta }, profile } = this.props;
    const style = item.user_id === profile.id ? { backgroundColor: Palette.white.alpha(0.7).css() } : {};

    return (
      <LeaderRow
        style={style}
        playerName={normalize.normalizeAllCapLetter(item.username)}
        grade={item.contents_learnt}
        seconds={`${new Date(item.time_elapsed).getSeconds()}s`}
        onPress={() => this.onPressProfile(item)}
      />
    )
  }
  render() {
    const { data: dataLeaders } = this.props;
    const { isLoadingProfile } = this.state;

    const styles = StyleSheet.create({
      contentContainer: {
        alignSelf: 'stretch',
        width: '100%',
      }
    })

    if (isLoadingProfile) return <Preloader />;

    return (
      <StyledContentBox image={'leaderboard_frame'}>
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
    );
  }
}
