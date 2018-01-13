import React, { Component } from 'react';
import styled from 'styled-components/native';
import { connect } from 'react-redux';
import { FormattedTime } from 'react-intl';
import { View, FlatList, Text, Image } from 'react-native';
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
  margin-top: ${Size.navbarHeight};
  align-items: center;
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
    const { leaders: { meta } } = this.props;

    if(meta.total_pages > 1) {
      await getLeaderboardAsync();
    }
  }

  _keyExtractor = (item, index) => item.id;
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

    if(!(dataLeaders.leaders || []).length) return <Preloader />;
    return (
      <MoiBackground>
        <Navbar />
        <FrameContainer>
          <LeaderFrame width={(width - 35)}>
            <FlatList
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
