import React, { Component } from 'react';
import styled from 'styled-components/native';
import { connect } from 'react-redux';
import { FormattedTime } from 'react-intl';
import uuid from 'uuid/v4';
import { View, FlatList, Text, Image, StyleSheet } from 'react-native';
import MoiBackground from '../../commons/components/Background/MoiBackground';
import Navbar from '../../commons/components/Navbar/Navbar';
import { Palette, Size } from '../../commons/styles';
import LeaderRow from '../../commons/components/LeaderRow/LeaderRow';
import leaderboardActions from '../../actions/leaderboardActions';
import { normalize } from '../../commons/utils';
import { BottomBar } from '../../commons/components/SceneComponents';
import Preloader from '../../commons/components/Preloader/Preloader';
import LeaderFrame from '../../commons/components/LeaderFrame/LeaderFrame';

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
})
export default class LeaderBoard extends Component {
  async componentDidMount() {
    const { getLeaderboardAsync } = this.props;
    await getLeaderboardAsync();
  }

  fetchNextPage = async () => {
    const { leaders: { meta }, getLeaderboardAsync } = this.props;

    if(meta.total_pages > 1) {
      await getLeaderboardAsync();
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

    if(!(dataLeaders.leaders || []).length) return <Preloader notFullScreen />;
    return (
      <MoiBackground>
        <Navbar />
        <FrameContainer>
          <LeaderFrame width={(width - 35)}>
            <FlatList
              contentContainerStyle={styles.contentContainer}
              onEndReached={this.fetchNextPage}
              onEndReachedThreshold={0}
              data={dataLeaders.leaders}
              renderItem={this._renderItem}
              keyExtractor={this._keyExtractor}
            />
          </LeaderFrame>
        </FrameContainer>
        <BottomBar />
      </MoiBackground>
    );
  }
}
