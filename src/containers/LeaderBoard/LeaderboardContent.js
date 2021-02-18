import React, { PureComponent } from 'react';
import styled from 'styled-components/native';
import { connect } from 'react-redux';
import { View, FlatList, StyleSheet, Alert, Text, TouchableHighlight } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Palette } from '../../commons/styles';
import LeaderRow from '../../commons/components/LeaderRow/LeaderRow';
import { normalize, object } from '../../commons/utils';
import Preloader from '../../commons/components/Preloader/Preloader';
import { FontAwesome } from '@expo/vector-icons';
import _ from 'lodash';
// Actions
import profilesActions from '../../actions/profileActions';
import treeActions from '../../actions/treeActions';
import leaderboardActions from '../../actions/leaderboardActions';
import deviceUtils from '../../commons/utils/device-utils';

const isTablet = deviceUtils.isTablet();

const FilterContainer = styled(View)`
  height: 30;
`;

const Dropdown = styled(View)`
  border: 1px solid ${Palette.white};
  border-radius: 5px;
  top: -10px;
  padding: 0 15px 0 10px;
  background-color: ${Palette.colors.blue};
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 120px;
`;

const ContentContainer = styled(View)`
  width: ${isTablet ? '85%' : '96%'};
  height:${isTablet ? '90%' : '100%'};
  padding-right: 8;
  padding-top: 10;
  position: relative;
  justify-content: center;
`;

const ContentFooter = styled(View)`
  justify-content: center;
  align-items: center;
`;

class LeaderBoardContent extends PureComponent {
  state = {
    isLoadingProfile: false,
    loading: true,
    showModal: false,
    sortItem: '',
  }

  isSuperEventLeaderBoard;

  _reload = async (newParams, item) => {
    this.setState({
      loading: true,
      sortItem: item,
    });
    const { getLeaderboardAsync } = this.props;
    try {
      await getLeaderboardAsync(newParams, 1);
      this.setState({loading: false});
    } catch(err) {
      this.setState({loading: false});
    }
  }

  async componentDidMount() {

    const { getLeaderboardAsync, leaderboardParams, actions } = this.props;
    if (actions && actions.onLoadComponent) {
      actions.onLoadComponent(this._reload);
    }

    await getLeaderboardAsync(leaderboardParams, 1);
    this.setState({loading: false});
  }

  fetchNextPage = async () => {
    const { loadMoreLeadersAsync, leaderboardParams } = this.props;
    const { sortItem } = this.state;

    if (!_.isEmpty(sortItem)) {
      const { sort_by: sortBy } = leaderboardParams;
      leaderboardParams[sortBy] = sortItem;
    }

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
        meta: {
          user_data: userLeader,
          sort_by_options: sortOptions
        }
      },
      closeModal,
      leaderboardParams,
      actions,
    } = this.props;

    const { isLoadingProfile, loading, sortItem } = this.state;

    const styles = StyleSheet.create({
      contentContainer: {
        alignSelf: 'stretch',
        width: '100%',
      }
    })

    this.isSuperEventLeaderBoard = !!closeModal;

    if(loading) return <Preloader notFullScreen/>;

    const { label, sort_by: sortBy} = leaderboardParams;
    const { showDropdownModal } = actions;
    const { values: sortValues } = sortOptions || {};

    return (
      <React.Fragment>
        <FilterContainer>
          <TouchableHighlight onPress = {() => { showDropdownModal(label, sortValues, sortBy) }}>
            <Dropdown>
              <Text style={{color: 'white'}}>{sortItem}</Text>
              <FontAwesome name='chevron-down' size={10} color="white" style={{position: 'absolute', right: 0}}/>
            </Dropdown>
          </TouchableHighlight>
        </FilterContainer>
        <ContentContainer>
          {(allLeaders || []).length > 0 && (
            <FlatList
              style={{ height: '90%', top: -10 }}
              contentContainerStyle={styles.contentContainer}
              onEndReached={this.fetchNextPage}
              onEndReachedThreshold={1}
              data={allLeaders}
              renderItem={this._renderItem}
              keyExtractor={this._keyExtractor}
            />
          )}
          {isLoadingProfile && <Preloader />}
          <ContentFooter>
            <FontAwesome name='ellipsis-h' size={15} color={Palette.white.css()}/>
            {userLeader && <LeaderRow
              position={userLeader.position}
              playerName={normalize.normalizeAllCapLetter(userLeader.username)}
              grade={userLeader.contents_learnt}
              seconds={`${new Date(userLeader.time_elapsed).getSeconds()}s`}
            />}
          </ContentFooter>
        </ContentContainer>
      </React.Fragment>
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
